import { Request, Response, Router } from 'express';
import path from 'path';
import { createReadStream, ensureDirSync, exists, existsSync, readJson, readJSONSync, removeSync, statSync } from 'fs-extra';
import { homedir } from 'os';
import axios from 'axios';
import { getBaseURL, getDirectories, isStreamFileAvailable, processIMDbConfig } from '../utils';
import ffmpeg from 'fluent-ffmpeg'


const router = Router();

const baseUrl = getBaseURL()
const folderPath = process.env.CONTENT_FOLDER_PATH || homedir();
const moviesDirPath = path.join(folderPath, './movies');

ffmpeg.setFfmpegPath(process.env.FFMPEG_EXECUTABLE_PATH as string);

ensureDirSync(moviesDirPath);

router.get('/movies', (_req: Request, res: Response) =>
{
    const movieDirs = getDirectories(moviesDirPath);
    const movies: any[] = [];

    for (const imdbID of movieDirs)
    {
        const movieDirPath = path.join(moviesDirPath, imdbID);

        try
        {
            const imdb_config = readJSONSync(path.join(movieDirPath, 'imdb.config.json'));

            processIMDbConfig(imdb_config);

            movies.push(imdb_config);
        }
        catch (error)
        {
            console.error('Invalid configuration detected:', error);
            res.status(500).send();
        }
    }

    res.json(movies);
});

let isInTask = false;

router.get('/movie/:imdbid', (req: Request, res: Response) =>
{
    const imdbID = req.params.imdbid;

    const movieDirPath = path.join(moviesDirPath, imdbID);

    // 使用 fs-extra 的 readJson 读取并解析 JSON 文件
    readJson(path.join(movieDirPath, 'imdb.config.json'), (err, imdb_config) =>
    {
        if (err) {
            console.error('Invalid configuration detected:', err);
            return res.status(500).send();
        }

        processIMDbConfig(imdb_config);

        return res.json(imdb_config);
    });
});

router.get('/movie/:imdbid/source', (req: Request, res: Response) =>
{
    const { imdbid: imdbID } = req.params;

    const movieDirPath = path.join(moviesDirPath, imdbID);

    readJson(path.join(movieDirPath, 'imdb.config.json'), (err, imdb_config) =>
    {
        if (err) {
            console.error('Invalid configuration detected:', err);
            return res.status(500).send();
        }

        const internalSourcePath = imdb_config.source.url;

        if (internalSourcePath)
        {
            return res.sendFile(path.join(movieDirPath, internalSourcePath));
        }
    });
});

router.get('/movie/:imdbid/stream/:file?', (req: Request, res: Response) =>
{
    const { imdbid: imdbID } = req.params;
    const file = req.params.file as string || '720p.mp4';
    const resolution = req.query.resolution as string || '720p';

    const movieDirPath = path.join(moviesDirPath, imdbID);

    readJson(path.join(movieDirPath, 'imdb.config.json'), (err, imdb_config) =>
    {
        if (err) {
            console.error('Invalid configuration detected:', err);
            return res.status(500).send();
        }

        switch (file.split('.').pop())
        {
            case 'm3u8':
                {
                    const movieSourcePath = imdb_config.source.url;
                    if (movieSourcePath)
                    {
                        const filePath = path.join(movieDirPath, movieSourcePath);

                        let size: string;
                        switch (resolution)
                        {
                            case '1080p':
                                size = '1920x1080';
                                break;
                            case '720p':
                                size = '1280x720';
                                break;
                            case '480p':
                                size = '854x480';
                                break;
                            default:
                                size = '1280x720'; // 默认720p
                                break;
                        }

                        res.setHeader('Content-Type', 'video/MP2T');

                        const outputDir = path.join(movieDirPath, `/${resolution}`);
                        const outputFilePath = path.join(outputDir, './stream.m3u8');

                        const isTemped = isStreamFileAvailable(outputFilePath);
                        if (isTemped)
                        {
                            return res.sendFile(outputFilePath);
                        }

                        if (isInTask)
                        {
                            return res.status(503).send('Compile in progress');
                        }

                        //TODO: 这就是实时流式传输了，没考虑清楚要不要留
                        isInTask = true;

                        ensureDirSync(outputDir);

                        // 使用 FFmpeg 转换为 HLS
                        ffmpeg(filePath)
                        .outputOptions([
                            '-hwaccel cuda',
                            '-g 60',
                            '-sc_threshold 0',
                            '-f hls',
                            '-hls_time 60',
                            '-hls_list_size 0',
                            '-hls_segment_filename', path.join(outputDir, 'segment_%03d.ts'),
                            '-threads 4',
                        ])
                        .videoCodec('h264_nvenc')
                        .size(size)
                        .output(outputFilePath)
                        .on('end', () => {
                            isInTask = false;
                            res.sendFile(outputFilePath);
                        })
                        .on('progress', (progress) => {
                            console.log(`${progress.timemark} ${progress.percent}%`);
                        })
                        .on('error', (err) => {
                            isInTask = false;
                            removeSync(outputDir);
                            console.error('Error:', err.message);
                            res.status(500).send('Error processing video');
                        })
                        .run();
                    }
                }
                break;

            case 'ts':
                {
                    const segmentPath = path.join(movieDirPath, resolution, file);
                    console.log(segmentPath);

                    if (!existsSync(segmentPath)) {
                        res.status(404).send('Segment not found');
                    }

                    res.setHeader('Content-Type', 'video/MP2T');
                    res.sendFile(segmentPath);
                }
                break;

            case 'mp4':
                {
                    const range = req.headers.range || "0";

                    const filePath = path.join(movieDirPath, "stream", file);
                    if (!existsSync(filePath)) {
                        return res.status(500).send();
                    }

                    const videoSize = statSync(filePath).size;

                    const CHUNK_SIZE = 10 ** 6;
                    const start = Number(range.replace(/\D/g, ""));
                    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                    const contentLength = end - start + 1;

                    const headers = {
                        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": contentLength,
                        "Content-Type": "video/mp4",
                    };

                    res.writeHead(206, headers);

                    const videoStream = createReadStream(filePath, { start, end });
                    videoStream.pipe(res);
                }
                break;

            default:
                return res.status(500).send();
        }
    });
});

router.get('/movie/:imdbid/poster', (req: Request, res: Response) =>
{
    const { imdbid: imdbID } = req.params;

    const movieDirPath = path.join(moviesDirPath, imdbID);

    readJson(path.join(movieDirPath, 'imdb.config.json'), (err, imdb_config) =>
    {
        if (err) {
            console.error('Invalid configuration detected:', err);
            return res.status(500).send();
        }

        const poster = imdb_config.poster;
        if (poster.source === 'internal')
        {
            return res.sendFile(path.join(movieDirPath, poster.url));
        }
        else if (poster.source === 'external')
        {
            axios.get(poster.url, { responseType: 'stream' })

                .then(response => response.data.pipe(res))

                .catch(__error => res.status(500).send())
        }
    });
});

router.get('/movie/:imdbid/tracks/:filename', (req: Request, res: Response) =>
{
    const { imdbid: imdbID } = req.params;
    const filename = req.params.filename;

    const movieDirPath = path.join(moviesDirPath, imdbID);

    if (filename)
    {
        const vttFilePath = path.join(movieDirPath, 'tracks', filename);
        res.sendFile(vttFilePath);
    }
    else
    {
        res.status(500).send();
    }
});


export default router;