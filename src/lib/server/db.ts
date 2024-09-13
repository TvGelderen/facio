import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

export const client = postgres({
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
});

export const db = drizzle(client, { schema });

export async function getUserById(id: string) {
    return db.query.userTable.findFirst({
        where: eq(schema.userTable.id, id)
    })
}

export async function insertUser(id: string, provider: string, provider_id: string, username: string, email: string | null, avatar: string | null) {
    return db.insert(schema.userTable).values({
        id,
        provider,
        provider_id,
        username,
        email,
        avatar
    });
}

export async function updateUser(id: string, username: string, email: string) {
    return db.update(schema.userTable).set({
        username,
        email
    }).where(eq(schema.userTable.id, id));
}
