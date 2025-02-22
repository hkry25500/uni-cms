import express, { Application, Request, Response, Router } from "express";
import RouterService from "@/lib/contracts/services/RouterService";


class ExpressRouterService extends RouterService {
    declare protected router: Application;

    constructor(router: Application) {
        super(router);
        this.router.use(express.json());
    }

    public get(path: string, handler: (req: Request, res: Response) => void): void {
        this.router.get(path, handler);
    }

    public post(path: string, handler: (req: Request, res: Response) => void): void {
        this.router.post(path, handler);
    }

    public put(path: string, handler: (req: Request, res: Response) => void): void {
        this.router.put(path, handler);
    }

    public delete(path: string, handler: (req: Request, res: Response) => void): void {
        this.router.delete(path, handler);
    }

    public respond(path: string, handler: (req: Request, res: Response) => void): void {
        this.router.use(path, handler);
    }

    public register(path: string, router: Router): void {
        this.router.use(path, router);
    }

    public use(middleware: (req: Request, res: Response, next: () => void) => void): void {
        this.router.use(middleware);
    }

    public start(addr: string, port: number, callback?: () => void): void {
        this.router.listen(port, addr, callback);
    }

    public createHttpAdapter(req: Request, res: Response): HttpAdapter {
        return {
            request: {
                method: req.method,
                params: req.params,
                body: req.body,
                query: req.query,
            } as HttpRequest,
            response: {
                json: (data) => res.json(data),
                status: (code) => {
                    res.status(code);
                    return res;
                },
                send: (data) => res.send(data),
            } as HttpResponse,
        };
    }
}

export default ExpressRouterService;
