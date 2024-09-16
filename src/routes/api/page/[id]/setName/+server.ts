import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { getPage, updatePageName } from "$lib/server/db";

export async function POST({ locals: { user }, params: { id }, url: { searchParams } }: RequestEvent): Promise<Response> {
    if (!user) {
        throw fail(401);
    }

    const name = searchParams.get("name");
    if (!name) {
        throw fail(400);
    }

    try {
        const page = await getPage(id);
        if (page.website.userId !== user.id) {
            throw fail(403);
        }

        await updatePageName(id, name);
    } catch (err) {
        console.error(err);
        throw fail(500);
    }

    return new Response(null, { status: 200 });
}
