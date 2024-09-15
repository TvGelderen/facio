import { z } from "zod";

export const pageFormSchema = z.object({
    name: z
        .string({ required_error: "Page name is required" })
        .min(1, { message: "Page name is required" })
        .max(64, {
            message: "Page name cannot be more than 64 characters long",
        })
        .trim(),
    path: z
        .string({ required_error: "Path is required" })
        .min(1, { message: "Path is required" })
        .max(64, {
            message: "Path cannot be more than 64 characters long",
        })
        .trim()
});

export type FormSchema = typeof pageFormSchema;
