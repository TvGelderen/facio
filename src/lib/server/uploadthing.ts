import { createUploadthing, UTApi } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { lucia } from "./auth";
import { insertImage } from "./db";
import { UPLOADTHING_SECRET } from "$env/static/private";

const f = createUploadthing();

async function auth(req: Request) {
    const sessionId = req.headers.get("cookie")?.split(`${lucia.sessionCookieName}=`)[1].split(';')[0];
    if (!sessionId) return null;

    const { user } = await lucia.validateSession(sessionId);

    return user?.id;
}

export const fileRouter = {
    imageUploader: f({ image: { maxFileSize: "2MB" } })
        .middleware(async ({ req }) => {
            const userId = await auth(req);
            if (!userId) {
                throw new Error("Unauthorized");
            }

            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            insertImage(metadata.userId, file.key, file.url);
        })
} satisfies FileRouter;

export type FacioFileRouter = typeof fileRouter;

export const utapi = new UTApi({
    token: UPLOADTHING_SECRET
});
