import { loadPyodide, PyodideInterface } from "pyodide"
import fs from "fs-extra";
import path from "node:path";


export class PythonManager
{
    protected runtime!: PyodideInterface;
    protected plugins: Map<string, PythonPlugin> = new Map();
    protected pathToPlugins!: string;


    public run(name: string): any
    {
        const plugin = this.plugins.get(name);

        if (plugin && plugin.code)
            return this.runtime.runPython(plugin.code);
    }

    public getFunc(name: string)
    {
        return this.runtime.globals.get(name);
    }

    public async build()
    {
        this.runtime = await loadPyodide();
        this.pathToPlugins = path.join(process.cwd(), "plugins");

        try {
            const items: string[] = await fs.readdir(this.pathToPlugins);

            for (const item of items) {
                const path_to_plugin_dir = path.join(this.pathToPlugins, item);
                const stat = await fs.stat(path_to_plugin_dir);

                if (stat.isDirectory()) {
                    const path_to_plugin_entry = path.join(path_to_plugin_dir, "entry.py");
                    const str = await fs.readFile(path_to_plugin_entry, 'utf-8');
                    this.plugins.set(
                        item,
                        {
                            name: item,
                            dirPath: path_to_plugin_dir,
                            entryPath: path_to_plugin_entry,
                            code: str
                        }
                    );
                }
            }
        }
        catch (err) {
            console.error(err);
        }

        return this;
    }

    public loadAll()
    {
        const array2D = Array.from(this.plugins);

        for (const array of array2D)
        {
            const key = array[0];
            const plugin = array[1];

            this.runtime.runPython(plugin.code!);
        }
    }

    constructor()
    {
    }
}