import { eq } from "drizzle-orm";
import { db } from "../db";
import { moviesTable, usersTable } from "../db/schema";


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