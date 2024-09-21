import { getPage, insertPageLayout, updatePageLayout } from "$lib/server/db";
import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import type { EditorElement } from "$lib/components/editor/types";

export async function POST({ request, locals: { user }, params: { id } }: RequestEvent): Promise<Response> {
    if (!user) {
        throw fail(401);
    }

    try {
        const page = await getPage(id);
        if (!page) {
            throw fail(404);
        }
        if (page.website.userId !== user.id) {
            throw fail(403);
        }

        const { elements } = await request.json();

        if (page.pageLayout === null) {
            await insertPageLayout(page.id, elements as EditorElement[]);
        } else {
            await updatePageLayout(page.pageLayout.id, elements as EditorElement[]);
        }
    } catch (err) {
        console.error(err);
        throw fail(500);
    }

    return new Response(null, { status: 200 });
}
