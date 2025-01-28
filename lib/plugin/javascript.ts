import path from "path";
import fs from 'fs-extra';
import { log } from "console";


export class JSManager
{
    protected plugins: Map<string, JSPlugin> = new Map();
    protected pathToPlugins!: string;


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

    public getPlugin(plugin: string)
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
        this.pathToPlugins = path.join(process.cwd(), "plugins");

        await fs.readdir(this.pathToPlugins)
            .then(async items =>
            {
                for (const item of items)
                {
                    const path_to_plugin_dir = path.join(this.pathToPlugins, item);
                    const stat = await fs.stat(path_to_plugin_dir);

                    if (stat.isDirectory())
                    {
                        const path_to_plugin_entry = path.join(path_to_plugin_dir, 'entry.mjs');
                        const module = await import(this.convertToFileURL(path_to_plugin_entry));
                        this.plugins.set(
                            item,
                            {
                                name: item,
                                dirPath: path_to_plugin_dir,
                                entryPath: path_to_plugin_entry,
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