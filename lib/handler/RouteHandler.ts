import CollectionService from "@/lib/services/models/CollectionService";


class RouteHandler {
    private collection: CollectionService;

    constructor(collection: CollectionService) {
        this.collection = collection;
    }

    public async handle(adapter: HttpAdapter) {
        const { method, params, body } = adapter.request;
        const res = adapter.response;

        switch (method) {
            case 'GET':
                return this.read(params.id, res);
            case 'POST':
                return this.create(body, res);
            case 'PUT':
                return this.update(params.id, body, res);
            case 'DELETE':
                return this.delete(params.id, res);
            default:
                res.status(405).send('Method Not Allowed');
        }
    }

    public async read(id: string, res: HttpResponse) {
        if (id) {
            const user = await this.collection.find(id);
            return res.json(user);
        }
        const users = await this.collection.findAll();
        return res.json(users);
    }

    public async create(data: object, res: HttpResponse) {
        const newUser = await this.collection.create(data);
        return res.status(201).json(newUser);
    }

    public async update(id: string, data: object, res: HttpResponse) {
        const updatedUser = await this.collection.update(id, data);
        return res.json(updatedUser);
    }

    public async delete(id: string, res: HttpResponse) {
        await this.collection.delete(id);
        return res.status(204).send();
    }

    public async init() {
        await this.collection.initialize();
    }
}

export default RouteHandler;
