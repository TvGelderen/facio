import { getWebsite } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { user }, params: { website_id } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    const website = await getWebsite(website_id);
    if (!website || website.userId !== user.id) {
        throw fail(404);
    }

    return {
        website
    }
}
