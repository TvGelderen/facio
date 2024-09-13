import { env } from "$env/dynamic/private";
import { fileRouter, utapi } from "$lib/server/uploadthing";

import { createRouteHandler } from "uploadthing/server";
import type { RequestEvent } from "./$types";
import { deleteLogo, getLogo } from "$lib/server/db";

const { GET, POST } = createRouteHandler({
    router: fileRouter,
    config: {
        uploadthingSecret: env.UPLOADTHING_SECRET,
    },
});

export { GET, POST };

export async function DELETE(event: RequestEvent): Promise<Response> {
    if (!event.locals.user) {
        return new Response(null, { status: 401 });
    }

    const file = event.url.searchParams.get("file");
    if (!file) {
        return new Response(null, { status: 400 });
    }

    const fileRecord = await getLogo(file);
    if (!fileRecord) {
        return new Response(null, { status: 404 });
    }
    if (fileRecord.userId !== event.locals.user.id) {
        return new Response(null, { status: 403 });
    }

    try {
        await utapi.deleteFiles(file);
        await deleteLogo(fileRecord.id);
    } catch (err) {
        console.error(err);
        return new Response(null, { status: 500 });
    }

    return new Response(null, { status: 200 });
}
