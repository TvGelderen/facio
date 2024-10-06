import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { user }, params }) => {
	if (!user) {
		throw redirect(302, "/login");
	}

	throw redirect(302, `/dashboard/${params.website_id}/pages`);
};
