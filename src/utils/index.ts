import fs, { existsSync } from 'fs-extra'
import path from 'path';
import { IConfigIMDb } from '../shared/interfaces';


export function getDirectories(srcPath: string)
{
    const items = fs.readdirSync(srcPath);
    const directories: string[] = [];

    for (const item of items) {
        const itemPath = path.join(srcPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            directories.push(item);
        }
    }

    return directories;
}

export function isStreamFileAvailable(filePath: string): boolean
{
    const isFileExisted = existsSync(filePath);

    if (!isFileExisted)
    {
        return false;
    }

    try
    {
        const data = fs.readFileSync(filePath, 'utf8');

        if (data.includes('#EXT-X-ENDLIST')) {
            return true;
        } else {
            return false;
        }
    }
    catch(err)
    {
        console.error('Error reading file:', err);
        return false;
    }
}

export function getBaseURL(): string
{
    return `${process.env.HOST_PROTOCOL}://${process.env.HOST_ADDR}:${process.env.HOST_PORT}`;
}

export function processIMDbConfig(imdb_config: IConfigIMDb)
{
    const baseURL = getBaseURL();
    const imdbID = imdb_config.id;

    // 替换 imdb 配置文件中的 相对路径 到 完整请求路径
    imdb_config.source.url = `${baseURL}/movies/${imdbID}/source`;
    imdb_config.stream.url = `${baseURL}/movies/${imdbID}/stream`;

    if (imdb_config.poster.source === 'internal')
    {
        imdb_config.poster.url = `${baseURL}/movies/${imdbID}/poster`;
    }
    delete imdb_config.poster.source;

    for (let track of imdb_config.tracks)
    {
        const filename = track.src;
        const altFilepath = `${baseURL}/movies/${imdbID}/tracks/${filename}`;
        track.src = altFilepath;
    }

    return imdb_config;
}