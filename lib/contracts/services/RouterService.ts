import path from "path";
import RouteHandler from "@/lib/handler/RouteHandler";
import fs from 'fs-extra';
import CollectionService from "@/lib/services/models/CollectionService";


abstract class RouterService {
    protected router: any;
    protected routes: RouteHandler[] = [];
    protected methods: RequestMethod[];

    constructor(router: any) {
        this.router = router;
        this.methods = ['GET', 'POST', 'PUT', 'DELETE']
    }

    /**
     * Adds a GET route
     * @param path The route path
     * @param handler The function to handle the request
     */
    public abstract get(path: string, handler: (req: any, res: any) => void): void;

    /**
     * Add a POST route
     * @param path The route path
     * @param handler The function to handle the request
     */
    public abstract post(path: string, handler: (req: any, res: any) => void): void;

    /**
     * Add a PUT route
     * @param path The route path
     * @param handler The function to handle the request
     */
    public abstract put(path: string, handler: (req: any, res: any) => void): void;

    /**
     * Add a DELETE route
     * @param path The route path
     * @param handler The function to handle the request
     */
    public abstract delete(path: string, handler: (req: any, res: any) => void): void;

    /**
     * Add a route
     * @param path The route path
     * @param handler The function to handle the request
     */
    public abstract respond(path: string, handler: (req: any, res: any) => void): void;

    /**
     * Add a router
     * @param path The route path
     * @param router The function to handle the request
     */
    public abstract register(path: string, router: any): void;

    /**
     * Add a middleware
     * @param middleware The middleware function
     */
    public abstract use(middleware: (req: any, res: any, next: () => void) => void): void;

    /**
     * Start the router service
     *
     * This method initializes the router service and begins listening for incoming requests
     * on the specified address and port. It can optionally accept a callback function that
     * will be executed once the server has started successfully.
     *
     * @param addr The address to listen on (e.g., 'localhost' or '0.0.0.0').
     * @param port The port number to listen on (e.g., 3000).
     * @param callback An optional function that will be called once the server starts successfully.
     *                 This can be used for logging or performing additional setup tasks.
     */
    public abstract start(addr: string, port: number, callback?: () => void): void;

    /**
     * Create a Http Adapter
     *
     * @param req The http request
     * @param res The http response
     */
    public abstract createHttpAdapter(req: HttpRequest, res: HttpResponse): HttpAdapter;

    /**
     * Create directory-based routes
     * @param basePath The base path for the routes
     * @param routes An object representing the directory structure and corresponding handlers
     */
    public async createDirectoryRoutes(basePath: string): Promise<void> {
        await this.searchForRoute(basePath);
    }

    private async searchForRoute(dirPath: string): Promise<void> {
        const dirnames = await fs.readdir(dirPath, { withFileTypes: true });

        for (const dirent of dirnames) {
            const fullPath = path.join(dirPath, dirent.name);
            if (dirent.isDirectory()) {
                await this.searchForRoute(fullPath);
            } else if (this.isValidFile(dirent)) {
                await this.processFile(dirPath, fullPath);
            }
        }
    }

    private async processFile(dirPath: string, fullPath: string): Promise<void> {
        const relativePath = path.relative(path.dirname(dirPath), dirPath);
        const prefix = relativePath ? `/${relativePath}` : '';

        try {
            const collection = await fs.readJSON(path.join(dirPath, "schema.json"));
            const handler = new RouteHandler(new CollectionService(collection));
            this.respond(`/api${prefix}/:id?`, (req, res) => handler.handle(this.createHttpAdapter(req, res)));
            await handler.init();
        } catch (error) {
            console.error(`Error processing ${fullPath}:`, error);
        }
    }

    protected isValidFile(dirent: fs.Dirent): boolean {
        return dirent.isFile() && dirent.name === "schema.json";
    }
}

export default RouterService;
