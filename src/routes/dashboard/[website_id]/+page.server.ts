import { error, redirect } from "@sveltejs/kit";
import { getWebsite } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { user }, params: { website_id } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    const website = await getWebsite(website_id);
    if (!website || website.userId !== user.id) {
        throw error(404, "Website not found");
    }

    return {
        website
    }
}
