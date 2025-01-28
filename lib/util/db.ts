import { eq } from "drizzle-orm";
import { db } from "../db";
import { moviesTable, usersTable } from "../db/schema";


export async function selectFrom(from: string)
{
    return (await db.execute(`SELECT * FROM ${from}`))[0];
}

export async function selectFromWhere(from: string, where: string) {
    return (await db.execute(`
        SELECT * FROM ${from} WHERE ${where}
    `))[0];
}

export async function showTables()
{
    const [rows] = await db.execute("SHOW TABLES");
    const tables = (rows as any).map((row: any) => {
        const key = Object.keys(row)[0];
        return { name: row[key] };
    });
    return tables;
}

export async function showColumnsFrom(from: string)
{
    return (await db.execute(`SHOW COLUMNS FROM ${from}`))[0];
}

export async function getUsers()
{
    return await db.select().from(usersTable);
}

export async function getUserById(uid: number)
{
    return (await db.select().from(usersTable).where(eq(usersTable.uid, uid)))[0];
}

export function getUsersTableColumns()
{
    return Object.keys(usersTable);
}

export async function updateUser(uid: number, raw_updates: string)
{
    const updates = JSON.parse(decodeURIComponent(raw_updates));
    await db.update(usersTable)
            .set(updates)
            .where(eq(usersTable.uid, uid));
}

export async function getMovies()
{
    return await db.select().from(moviesTable);
}

export async function getMoviesById(id: string)
{
    return (await db.select().from(moviesTable).where(eq(moviesTable.id, id)))[0];
}

export function getMoviesTableColumns()
{
    return Object.keys(moviesTable);
}