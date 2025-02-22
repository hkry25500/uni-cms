import { MySql2Database } from "drizzle-orm/mysql2";
import StoreService from "@/lib/contracts/services/StoreService";


class MysqlStoreService extends StoreService {
    declare protected database: MySql2Database;

    constructor(database: MySql2Database) {
        super(database);
        this.database = database;
    }

    public async initializeDatabase(name: string, fields: any[]): Promise<void> {
        const attributes = fields.map(field => {
            let fieldDefinition = `${field.name} ${field.type.toUpperCase()}`;

            if (field.length) {
                fieldDefinition += `(${field.length})`;
            }

            if (field.primary) {
                fieldDefinition += ' PRIMARY KEY';
            }

            if (field.autoIncrement) {
                fieldDefinition += ' AUTO_INCREMENT';
            }

            if (field.nullable === false) {
                fieldDefinition += ' NOT NULL';
            }

            if (field.default) {
                fieldDefinition += ` DEFAULT ${field.default}`;
            }

            return fieldDefinition;
        });

        const createTableSQL = `CREATE TABLE IF NOT EXISTS ${name} (${attributes.join(', ')})`;

        await this.database.execute(createTableSQL);
    }

    public async create<T extends object>(table: string, data: T): Promise<void> {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');

        const insertSQL = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
        await this.database.execute(insertSQL);
    }

    public async find<T>(table: string, conditions: Partial<T>): Promise<T[]> {
        const whereClause = Object.entries(conditions)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(' AND ');

        const selectSQL = `SELECT * FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        const result = await this.database.execute(selectSQL);

        return result[0] as unknown as T[];
    }

    public async update<T>(table: string, data: Partial<T>, conditions: Partial<T>): Promise<void> {
        const setClause = Object.entries(data)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(', ');

        const whereClause = Object.entries(conditions)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(' AND ');

        const updateSQL = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        await this.database.execute(updateSQL);
    }

    public async delete<T>(table: string, conditions: Partial<T>): Promise<void> {
        // 构建 WHERE 子句
        const whereClause = Object.entries(conditions)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(' AND ');

        const deleteSQL = `DELETE FROM ${table} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        await this.database.execute(deleteSQL);
    }

}

export default MysqlStoreService;
