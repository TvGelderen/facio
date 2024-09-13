import { lucia } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function GET(event: RequestEvent): Promise<Response> {
    const sessionId = event.cookies.get(lucia.sessionCookieName);
    if (sessionId) {
        await lucia.invalidateSession(sessionId);
    }

    throw redirect(302, "/");
}
