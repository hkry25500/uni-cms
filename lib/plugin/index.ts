import path from "path";
import fs from 'fs-extra';


export class PluginManager
{
    protected plugins: Map<string, JSPlugin> = new Map();
    protected pluginsDirPath!: string;


    public async load(key: string)
    {
        const plugin = this.plugins.get(key);

        if (plugin && plugin.module)
            return plugin.module;
    }

    public async loadAll(args: any)
    {
        const map_array = Array.from(this.plugins);

        for (const array of map_array)
        {
            const name = array[0];
            const plugin = array[1];

            plugin.module.default(args);
        }
    }

    public getPlugin(plugin: string): JSPlugin | undefined
    {
        return this.plugins.get(plugin);
    }

    public getPluginList(): JSPlugin[]
    {
        let list: JSPlugin[] = []
        for (const array of Array.from(this.plugins)) {
            list.push(array[1]);
        }
        return list;
    }

    public async buildAsync()
    {
        this.pluginsDirPath = path.join(process.cwd(), "plugins");

        await fs.ensureDir(this.pluginsDirPath);

        await fs.readdir(this.pluginsDirPath)
            .then(async dirnames =>
            {
                for (const dirname of dirnames)
                {
                    const pluginDirPath = path.join(this.pluginsDirPath, dirname);
                    const stat = await fs.stat(pluginDirPath);

                    if (stat.isDirectory())
                    {
                        const pluginEntryFilePath = path.join(pluginDirPath, 'entry.mjs');
                        const module = await import(this.convertToFileURL(pluginEntryFilePath));
                        const pluginName = module.metadata.name || dirname;

                        this.plugins.set(
                            pluginName,
                            {
                                name: pluginName,
                                dirPath: pluginDirPath,
                                entryPath: pluginEntryFilePath,
                                metadata: module.metadata,
                                module: module,
                            }
                        );
                    }
                }
            });

        return this;
    }

    public convertToFileURL(path: string) {
        // 使用正则表达式匹配盘符并替换为file://
        return path.replace(/^([a-zA-Z]):\\/, 'file:///$1:/');
    }
}