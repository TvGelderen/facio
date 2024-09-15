import { getPage } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { user }, params: { page_id } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    const page = await getPage(page_id);
    if (!page || page.website.userId !== user.id) {
        throw fail(404);
    }

    return {
        user,
        data: page
    };
}
