import { dev } from "$app/environment";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { sessionTable, userTable } from "./schema";
import { db } from "./db";

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}
