import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import { singleton } from "../lifecycle";


if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL');
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
    const poolConnection = createPool(process.env.DATABASE_URL!);
    return drizzle(poolConnection);
}

export const db = singleton('db', createDatabaseConnection);