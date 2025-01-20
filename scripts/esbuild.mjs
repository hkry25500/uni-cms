import { build } from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import envFilePlugin from 'esbuild-envfile-plugin';


// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entryPoint = resolve(__dirname, '../bin/unicms.ts');
const outFile = resolve(__dirname, '../dist/bundle.cjs');

build({
    entryPoints: [entryPoint],
    bundle: true,
    platform: 'node',
    outfile: outFile,
    target: 'node16',
    external: ['next'], // 将路径标记为外部依赖
    plugins: [envFilePlugin],
    define: {
        // "process.env.CONTENT_DIR_PATH": JSON.stringify("D:\\Express\\static")
    }
})
.catch(() => process.exit(1));