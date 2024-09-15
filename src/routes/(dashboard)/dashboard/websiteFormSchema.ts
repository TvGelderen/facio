import { z } from "zod";

export const websiteFormSchema = z.object({
    name: z
        .string({ required_error: "Website name is required" })
        .min(1, { message: "Website name is required" })
        .max(64, {
            message: "Website name cannot be more than 64 characters long",
        })
        .trim(),
    description: z
        .string({ required_error: "Description is required" })
        .min(1, { message: "Description is required" }),
    logo: z.string().optional()
});

export type FormSchema = typeof websiteFormSchema;
