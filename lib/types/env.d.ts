// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        HOST_ADDR: string; // 主机地址
        HOST_PORT: string; // 主机端口
        HOST_PROTOCOL: 'http' | 'https'; // 主机协议，假设只支持 http 和 https
        CONTENT_DIR_PATH: string; // 资源目录路径
        FFMPEG_EXECUTABLE_PATH: string; // FFMPEG 可执行文件路径
        DATABASE_URL: string; // 数据库连接字符串
        API_KEY: string; // API 密钥
        NODE_ENV?: 'development' | 'production' | 'test'; // 可选的环境变量
        NO_WEBUI: BooleanChar; // 布尔值，作为字符串
        CACHE_TIME_TO_LIVE_SECONDS: string; // 缓存生存时间，作为字符串
    }
}
