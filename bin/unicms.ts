#!/usr/bin/env node

import dotenv from 'dotenv'; dotenv.config();
import { env } from 'node:process';
import { Command } from 'commander';
import express from "express";
import cors from 'cors'
import next from 'next';
import { exec } from 'child_process';
import { PluginManager } from '@/lib/plugin';
import { singleton } from '@/lib/lifecycle';


const program = new Command();
const pluginManager = singleton('plugin', () => new PluginManager());
const address: string = env.HOST_ADDR || "127.0.0.1";
const port: number = Number.parseInt(env.HOST_PORT || "8080");

program
    .version("0.3.1")
    .description("uniCMS is a universal Content Management System developed by UC Berkeley EECS and UniJS team.");

program
    .command("start")
    .description("Launch uniCMS in production-ready HTTP server")
    .action(async () =>
    {
        const server = express();
        await pluginManager.buildAsync();

        // Load all Middlewares
        server.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

        server.use('/', (await import('../src/routes/serve')).default);

        // Load all JS written plugin in memory
        await pluginManager.loadAll(server);

        // TODO: Python compatible plugin
        //

        // OPTIONAL: Load WEB UI
        if (process.env.NO_WEBUI === 'false')
        {
            const app = next({ dev: false });

            await app.prepare();

            server.get('*', (req, res) => {
                return app.getRequestHandler()(req, res);
            });
        }

        server.listen(port, address, () => {
            console.log();
            console.log('\x1b[43m\x1b[30m%s\x1b[0m', '🚀 uniCMS server is running!');
            console.log('\x1b[42m\x1b[30m%s\x1b[0m', '🟢 PRODUCTION MODE');
            console.log('\n');
            console.log('\x1b[33m\x1b[1m%s\x1b[0m', `📦 Content directory: \x1b[0m\x1b[33m${env.CONTENT_DIR_PATH}`);
            console.log();
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', `🌐 Server address: \x1b[0m\x1b[34m${env.HOST_PROTOCOL}://${address}:${port}`);
            console.log();
            console.log('\x1b[35m\x1b[1m%s\x1b[0m', `🌈 Database URL: \x1b[0m\x1b[35m${env.DATABASE_URL}`);
            console.log();
            if (env.NO_WEBUI==='false') console.log('\x1b[32m\x1b[1m%s\x1b[0m', '💻 WEBUI is enabled!');
            // Plugin
            console.log('\n');
            console.log('\x1b[43m\x1b[30m%s\x1b[0m', '🔌 Loading available plugins...');
            for (const plugin of pluginManager.getPluginList()) {
                console.log('\x1b[30m\x1b[1m%s\x1b[0m', `✅ ${plugin.name} is enabled!`);
            }
        });
    });


program
    .command("dev")
    .description("Launch uniCMS in development HMR server")
    .action(async () =>
    {
        const server = express();
        await pluginManager.buildAsync();

        // Load all Middlewares
        server.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

        server.use('/', (await import('../src/routes/serve')).default);

        // Load all JS written plugin in memory
        await pluginManager.loadAll(server);

        // TODO: Python compatible plugin
        //

        // OPTIONAL: Load WEB UI
        if (process.env.NO_WEBUI === 'false')
        {
            const app = next({ dev: true });

            await app.prepare();

            server.get('*', (req, res) => {
                return app.getRequestHandler()(req, res);
            });
        }

        server.listen(port, address, () => {
            // Default
            console.log();
            console.log('\x1b[43m\x1b[30m%s\x1b[0m', '🚀 uniCMS server is running!');
            console.log('\x1b[41m\x1b[37m%s\x1b[0m', '🔴 DEV ONLY, DO NOT USE THIS IN PRODUCTION!');
            console.log();
            console.log('Learn more: \x1b[36mhttps://learn.microsoft.com/en-us/unicms/\x1b[0m');
            console.log('\n');
            console.log('\x1b[33m\x1b[1m%s\x1b[0m', `📦 Content directory: \x1b[0m\x1b[33m${env.CONTENT_DIR_PATH}`);
            console.log();
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', `🌐 Server address: \x1b[0m\x1b[34m${env.HOST_PROTOCOL}://${address}:${port}`);
            console.log();
            console.log('\x1b[35m\x1b[1m%s\x1b[0m', `🌈 Database URL: \x1b[0m\x1b[35m${env.DATABASE_URL}`);
            console.log();
            console.log('\x1b[32m\x1b[1m%s\x1b[0m', '🔄 HMR is enabled!');
            if (env.NO_WEBUI==='false') console.log('\x1b[32m\x1b[1m%s\x1b[0m', '💻 WEBUI is enabled!');
            // Plugin
            console.log('\n');
            console.log('\x1b[43m\x1b[30m%s\x1b[0m', '🔌 Loading available plugins...');
            for (const plugin of pluginManager.getPluginList()) {
                console.log('\x1b[30m\x1b[1m%s\x1b[0m', `✅ ${plugin.name} is enabled!`);
            }
        });
    });


program
    .command("build")
    .description("Create optimized, high-performance build of uniCMS.")
    .action(async () =>
    {
        const cwd = process.cwd();

        function printError(message: string) {
            console.error(message);
            console.log('\x1b[41m\x1b[30m%s\x1b[0m', '❌ Production build failed to complete.');
            console.log();
        }

        console.log();
        console.log('\x1b[43m\x1b[30m%s\x1b[0m', '🔨 Creating optimized production build...');
        console.log('\n');

        exec('next build', { cwd: cwd }, (error, stdout, stderr) => {
            if (error) {
                printError(error.message);
                return;
            }
            if (stderr) {
                printError(stderr);
                return;
            }

            console.log(stdout);

            console.log('\x1b[42m\x1b[30m%s\x1b[0m', '✅ Production build completed successfully.');
            console.log();
        });
    });

program
    .command("test")
    .description("")
    .action(async () =>
    {
    });


program.parse(process.argv);