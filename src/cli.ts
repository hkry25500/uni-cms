import { db } from "@/lib/db";
import services from "@/lib/ioc/provider";
import { PluginManager } from "@/lib/plugin";
import MysqlStoreService from "@/lib/services/storage/MysqlStoreService";
import { Command } from "commander";
import { cwd, env } from "node:process";
import packageJson from '@/package.json';
import path from "node:path";
import { convertToFileURL } from "@/lib/util/fs";
import ExpressRouterService from "@/lib/services/router/ExpressRouterService";
import express from "express";


const program                                    = new Command();
const address: string                            = env.HOST_ADDR || "127.0.0.1";
const port: number                               = Number.parseInt(env.HOST_PORT || "8080");

services
    .addSingleton(MysqlStoreService, db)
    .addSingleton(ExpressRouterService, express())
    .addSingleton(PluginManager);

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version)
    .usage("<COMMAND> [OPTIONS]");

// start
program
    .command("start")
    .alias("serve")
    .description("Launch UniCMS in production-ready HTTP server")
    .action(async () =>
    {
        (await import("../src/serve")).default({
            addr: address,
            port: port,
            dev: false
        });
    });

// dev
program
    .command("dev")
    .description("Launch UniCMS in development HMR server")
    .action(async () =>
    {
        (await import("../src/serve")).default({
            addr: address,
            port: port,
            dev: true
        });
    });

// build
program
    .command("build")
    .description("Create optimized, high-performance build of UniCMS")
    .action(async () =>
    {
        (await import("../src/build")).default();
    });

// run
program
    .command("run <script>")
    .alias("debug")
    .alias("test")
    .description("Run dedicate script to debug")
    .action(async (script: string) =>
    {
        const scriptsDir = path.join(cwd(), "scripts");
        try {
            await import(convertToFileURL(path.join(scriptsDir, script)));
        } catch (error) {
            console.error("Failed to import script:", error);
        }
    });


program.parse(process.argv);