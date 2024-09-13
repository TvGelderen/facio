import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { z, ZodError } from "zod";
import { updateUser } from "$lib/server/db";

export const load: PageServerLoad = ({ locals: { user } }) => {
    if (!user) {
        throw redirect(302, "/login");
    }

    return {
        user
    };
}

const userUpdateForm = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(1, { message: "Username is required" })
        .max(64, {
            message: "Username cannot be more than 64 characters long",
        })
        .trim(),
    email: z
        .string({ required_error: "Email is required" })
        .min(1, { message: "Email is required" })
        .max(64, {
            message: "Email cannot be more than 64 characters long",
        })
        .email(),
});

export const actions = {
    default: async ({ locals, request }: RequestEvent) => {
        if (!locals.user) throw redirect(302, "/");

        const formData = Object.fromEntries(await request.formData());

        try {
            const result = userUpdateForm.parse(formData);

            await updateUser(locals.user.id, result.username, result.email);
        } catch (err) {
            console.error(err);

            if (err instanceof ZodError) {
                const { fieldErrors } = err.flatten();

                return {
                    data: formData,
                    errors: fieldErrors,
                    success: false
                }
            }

            return { success: false }
        }

        return {
            data: formData,
            success: true
        };
    }
}
