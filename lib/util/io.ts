import fs from 'fs-extra';
import path from 'path';


export async function fetchDirectoryContents(dirpath: string)
{
    if (!dirpath)
        return;

    const results: any[] = [];

    async function readDir(_dirpath: string) {
        const items = await fs.readdir(_dirpath);

        for (const item of items) {
            const fullPath = path.join(_dirpath, item);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                let type = 'directory';
                const imdbConfigPath = path.join(fullPath, 'imdb.config.json');
                if (await fs.pathExists(imdbConfigPath)) {
                    type = 'imdb';
                }
                results.push({ type, path: fullPath, name: item });
            } else {
                results.push({ type: 'file', path: fullPath, name: item });
            }
        }
    }

    await readDir(dirpath);

    return results;
}