import path from "node:path";
import { cwd } from "node:process";


export const defaultEnvVars = {
    HOST_ADDR: '127.0.0.1',
    HOST_PORT: '3000',
    HOST_PROTOCOL: 'http',
    CONTENT_DIR_PATH: path.join(cwd(), "api"),
    DATABASE_URL: 'mysql://root:@localhost:3306/unicms',
    API_KEY: 'your_api_key',
    NODE_ENV: 'development', // 默认环境
    NO_WEBUI: 'false',
    CACHE_TIME_TO_LIVE_SECONDS: '3600',
};
