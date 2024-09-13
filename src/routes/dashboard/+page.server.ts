import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserWebsites } from "$lib/server/db";

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    return {
        user,
        websites: await getUserWebsites(user.id)
    }
}
