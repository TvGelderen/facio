import { github, lucia } from "$lib/server/auth";
import { db, insertUser } from "$lib/server/db";
import { users } from "$lib/server/schema";
import type { RequestEvent } from "@sveltejs/kit";
import { OAuth2RequestError } from "arctic";
import { and, eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";

export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("github_oauth_state") ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, { status: 400 });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const githubUser: GitHubUser = await githubUserResponse.json();

        const user = await db.query.users.findFirst({
            where: and(eq(users.provider, "github"), eq(users.provider_id, githubUser.id.toString()))
        })

        let userId = user?.id ?? generateIdFromEntropySize(10);
        if (!user) {
            await insertUser(userId, "github", githubUser.id.toString(), githubUser.login, githubUser.email, githubUser.avatar_url);
        }

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        console.error(e);

        if (e instanceof OAuth2RequestError) {
            return new Response(null, { status: 400 });
        }

        return new Response(null, { status: 500 });
    }
}

interface GitHubUser {
    id: number;
    login: string;
    email: string | null;
    avatar_url: string;
}
