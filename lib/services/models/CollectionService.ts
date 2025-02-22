import services from "@/lib/ioc/provider";
import MysqlStoreService from "@/lib/services/storage/MysqlStoreService";


class CollectionService {
    public readonly collection: ICollection;
    private readonly database = services.getService(MysqlStoreService) as MysqlStoreService;
    private readonly key: string;

    constructor(collection: ICollection) {
        this.collection = collection;
        this.key = this._findPrimaryKey();
    }

    public async initialize() {
        await this.database.initializeDatabase(this.collection.collectionName, this.collection.attributes);
    }

    public async find(id) {
        return await this.database.find(this.collection.collectionName, { [this.key]: id });
    }

    public async findAll() {
        return await this.database.find(this.collection.collectionName, {});
    }

    public async create(data) {
        delete data[this.key];
        await this.database.create(this.collection.collectionName, data);
    }

    public async update(id, data) {
        await this.database.update(this.collection.collectionName, data, { [this.key]: id });
        return this.find(id);
    }

    public async delete(id) {
        await this.database.delete(this.collection.collectionName, { [this.key]: id });
    }

    private _findPrimaryKey(): string {
        const primaryAttribute = this.collection.attributes.find(attr => (attr as IntAttribute).primary ?? false);

        if (primaryAttribute) {
            return primaryAttribute.name;
        } else {
            throw new Error("No primary attribute found");
        }
    }
}

export default CollectionService;
