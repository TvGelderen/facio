import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { pageFormSchema } from "./pageFormSchema";
import { insertPage } from "$lib/server/db";

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    return {
        pageForm: await superValidate(zod(pageFormSchema))
    }
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (!event.locals.user) {
            throw redirect(302, "/login");
        }

        const form = await superValidate(event, zod(pageFormSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await insertPage(event.params.website_id, form.data.name, form.data.path);
        } catch (err) {
            console.error(err);
            return fail(500);
        }

        redirect(302, `/dashboard/${event.params.website_id}/editor/`);
    }
}
