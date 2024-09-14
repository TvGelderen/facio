import { getUserWebsites, insertWebsite } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad, RequestEvent } from "./$types";
import { formSchema } from "./schema";

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    return {
        user,
        websites: await getUserWebsites(user.id),
        superValidatedForm: await superValidate(zod(formSchema))
    }
}

export const actions = {
    default: async (event: RequestEvent) => {
        if (!event.locals.user) throw redirect(302, "/login");

        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const response = await insertWebsite(event.locals.user.id, form.data.name, form.data.description, form.data.logo ?? null);

        redirect(302, `/dashboard/${response.id}`);
    }
}
