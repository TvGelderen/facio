import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { eq, sql } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import type { Page, PageRecord, Website } from '$lib/types';
import { error } from '@sveltejs/kit';
import { page } from '$app/stores';

export const client = postgres({
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
});

export const db = drizzle(client, { schema });

export function getUserById(id: string) {
    return db.query.users.findFirst({
        where: eq(schema.users.id, id)
    })
}

export function insertUser(id: string, provider: string, provider_id: string, username: string, email: string | null, avatar: string | null) {
    return db.insert(schema.users).values({
        id,
        provider,
        provider_id,
        username,
        email,
        avatar,
    });
}

export function updateUser(id: string, username: string, email: string) {
    return db.update(schema.users).set({
        username,
        email,
        updatedAt: sql`NOW()`
    }).where(eq(schema.users.id, id));
}

export async function insertWebsite(userId: string, name: string, description: string, logo: string | null) {
    return (await db.insert(schema.websites).values({
        id: generateIdFromEntropySize(8),
        userId,
        name,
        description,
        logo,
    }).returning({ id: schema.websites.id }))[0];
}

export function updateWebsiteName(id: string, name: string) {
    return db.update(schema.websites).set({
        name,
        updatedAt: sql`NOW()`
    }).where(eq(schema.websites.id, id));
}

export function updateWebsiteDescription(id: string, description: string) {
    return db.update(schema.websites).set({
        description,
        updatedAt: sql`NOW()`
    }).where(eq(schema.websites.id, id));
}

export function updateWebsiteLogo(id: string, logo: string) {
    return db.update(schema.websites).set({
        logo,
        updatedAt: sql`NOW()`
    }).where(eq(schema.websites.id, id));
}

export async function getWebsite(id: string): Promise<Website> {
    const website = await db.query.websites.findFirst({
        where: eq(schema.websites.id, id),
        with: {
            pages: true
        }
    });
    if (!website) {
        throw error(404);
    }

    return website;
}

export function deleteWebsite(id: string) {
    return db.delete(schema.websites).where(eq(schema.websites.id, id));
}

export function getUserWebsites(id: string) {
    return db.query.websites.findMany({
        where: eq(schema.websites.userId, id)
    });
}

export async function insertPage(websiteId: string, name: string, path: string) {
    return (await db.insert(schema.pages).values({
        id: generateIdFromEntropySize(8),
        websiteId,
        name,
        path,
        createdAt: sql`NOW()`,
        updatedAt: sql`NOW()`,
    }).returning({ id: schema.pages.id }))[0];
}

export async function getPage(id: string): Promise<Page> {
    const page = await db.query.pages.findFirst({
        where: eq(schema.pages.id, id),
        with: {
            website: true
        }
    });
    if (!page) {
        throw error(404);
    }

    return page;
}

export function insertImage(userId: string, file: string, url: string) {
    return db.insert(schema.images).values({
        userId,
        file,
        url,
    })
}

export function getImage(file: string) {
    return db.query.images.findFirst({
        where: eq(schema.images.file, file)
    });
}

export function deleteLogo(id: number) {
    return db.delete(schema.images).where(eq(schema.images.id, id));
}
