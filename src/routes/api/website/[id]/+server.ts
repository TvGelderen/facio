import { deleteWebsite, getWebsite } from "$lib/server/db";
import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function DELETE({ locals: { user }, params: { id } }: RequestEvent): Promise<Response> {
    if (!user) {
        throw fail(401);
    }

    const website = await getWebsite(id);
    if (!website) {
        throw fail(404);
    }
    if (website.userId !== user.id) {
        throw fail(403);
    }

    try {
        await deleteWebsite(id);
    } catch (err) {
        console.error(err);

        throw fail(500);
    }

    return new Response(null, { status: 201 });
}
