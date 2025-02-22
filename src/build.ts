import Logger from "@/lib/util/logger";
import { exec } from "node:child_process";


export default async function build() {
    const cwd = process.cwd();

    function printError(message: string) {
        console.error(message);
        Logger.error("❌ Production build failed to complete.")
        console.log();
    }

    console.log();
    Logger.section("🔨 Creating optimized production build...")
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

        Logger.success("✅ Production build completed successfully.");
        console.log();
    });
}