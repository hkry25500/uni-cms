import { PluginManager } from '@/lib/plugin';
import cors from 'cors';
import next from 'next';
import { env } from 'node:process';
import Logger from '@/lib/util/logger';
import services from '@/lib/ioc/provider';
import ExpressRouterService from '@/lib/services/router/ExpressRouterService';


export default async function serve({ addr, port, dev }: {
    addr: string;
    port: number;
    dev: boolean;
}) {
    const routerService = services.getRequiredService(ExpressRouterService);
    const pluginManager = services.getRequiredService(PluginManager);

    await routerService.createDirectoryRoutes(env.CONTENT_DIR_PATH);
    await pluginManager.buildAsync();

    // Load all Middlewares
    routerService.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

    // OPTIONAL: Load WEB UI
    if (process.env.NO_WEBUI === 'false')
    {
        const app = next({ dev });

        await app.prepare();

        routerService.get('*', (req, res) => {
            return app.getRequestHandler()(req, res);
        });
    }

    routerService.start(addr, port, () => {
        // Default
        Logger.section('🚀 UniCMS server is running!');
        dev ? Logger.warning("🔴 DEV ONLY, DO NOT USE THIS IN PRODUCTION") : Logger.success("🟢 PRODUCTION READY");
        Logger.blank();
        Logger.highlight('Learn more: https://learn.microsoft.com/en-us/unicms/');
        Logger.blank();Logger.blank();
        Logger.log("📦 Content directory: ", Logger.colors.yellow, '', true); Logger.default(`\n    ${env.CONTENT_DIR_PATH}`);
        Logger.blank();
        Logger.log("🌐 Server address: ", Logger.colors.blue, '', true); Logger.default(`\n    ${env.HOST_PROTOCOL}://${addr}:${port}`);
        Logger.blank();
        Logger.log("🌈 Database URL: ", Logger.colors.magenta, '', true); Logger.default(`\n    ${env.DATABASE_URL}`);
        Logger.blank();
        dev && Logger.success('🔄 HMR is enabled!');
        env.NO_WEBUI === 'false' && Logger.success('💻 WEBUI is enabled!');

        // Plugin
        Logger.blank();
        pluginManager.getPluginList().length > 0 && (() => {
            Logger.section('🔌 Loading available plugins...');
            pluginManager.getPluginList().forEach(plugin => {
                Logger.default(`✅ ${plugin.name} is enabled!`);
            });
            Logger.blank();
        })();
    });
}