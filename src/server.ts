import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors'
import router from "./routes/serve.js";
import next from 'next';


const address = process.env.HOST_ADDR || '127.0.0.1';
const port = process.env.HOST_PORT || 8080;

if (process.env.NO_WEBUI === 'true')
{
    const server = express();

    server.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

    server.use('/', router);

    server.listen(port as number, address, () => {
        console.log(`CDN server is running on port ${port}`);
    });
}
else
{
    const app = next({ dev: process.env.NODE_ENV === 'development' });

    app.prepare().then(() =>
    {
        const server = express();

        server.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

        server.use('/', router);

        server.get('*', (req, res) => {
            return app.getRequestHandler()(req, res);
        });

        server.listen(port as number, address, () => {
            console.log(`CDN server is running on port ${port}`);
        });
    });
}