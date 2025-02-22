/**
 * Abstract class representing a generic store service.
 */
abstract class StoreService {
    protected database: any; // Can be adjusted based on the specific database type

    /**
     * Creates an instance of StoreService.
     * @param {any} database - The database connection instance.
     */
    constructor(database: any) {
        this.database = database;
    }

    /**
     * Initializes the database with the specified table name and fields.
     * @param {string} name - The name of the table to be created.
     * @param {Array<any>} fields - An array of field definitions for the table.
     * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
     */
    abstract initializeDatabase(name: string, fields: any[]): Promise<void>;

    /**
     * Creates a new record in the specified table.
     * @param {string} table - The name of the table where the record will be created.
     * @param {T} data - The data to be inserted as a new record.
     * @returns {Promise<void>} - A promise that resolves when the record is created.
     */
    abstract create<T extends object>(table: string, data: T): Promise<void>;

    /**
     * Finds records in the specified table that match the given conditions.
     * @param {string} table - The name of the table to search in.
     * @param {Partial<T>} conditions - An object representing the search conditions.
     * @returns {Promise<T[]>} - A promise that resolves to an array of matching records.
     */
    abstract find<T>(table: string, conditions: Partial<T>): Promise<T[]>;

    /**
     * Updates records in the specified table that match the given conditions.
     * @param {string} table - The name of the table to update.
     * @param {Partial<T>} data - An object representing the data to update.
     * @param {Partial<T>} conditions - An object representing the conditions to match.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     */
    abstract update<T>(table: string, data: Partial<T>, conditions: Partial<T>): Promise<void>;

    /**
     * Deletes records in the specified table that match the given conditions.
     * @param {string} table - The name of the table from which to delete records.
     * @param {Partial<T>} conditions - An object representing the conditions to match for deletion.
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
     */
    abstract delete<T>(table: string, conditions: Partial<T>): Promise<void>;
}

export default StoreService;
