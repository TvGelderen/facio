import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getWebsite } from "$lib/server/db";

export const load: PageServerLoad = async ({ locals: { user }, params: { id } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    const website = await getWebsite(Number.parseInt(id));
    if (!website) {
        throw error(404, "Website not found");
    }

    return {
        website
    }
}
