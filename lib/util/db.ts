import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";


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