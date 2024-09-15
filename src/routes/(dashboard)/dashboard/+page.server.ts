import { getUserWebsites, insertPage, insertWebsite } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, RequestEvent } from "./$types";
import { websiteFormSchema } from "./websiteFormSchema";

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    return {
        user,
        websites: await getUserWebsites(user.id),
        websiteForm: await superValidate(zod(websiteFormSchema))
    }
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (!event.locals.user) {
            throw redirect(302, "/login");
        }

        const form = await superValidate(event, zod(websiteFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }


        let id = ""
        try {
            const response = await insertWebsite(event.locals.user.id, form.data.name, form.data.description, form.data.logo ?? null);
            id = response.id;

            // Create home page for website by default
            await insertPage(id, "Home Page", "/");
        } catch (err) {
            console.error(err);
            return fail(500);
        }

        redirect(302, `/dashboard/${id}`);
    }
}
