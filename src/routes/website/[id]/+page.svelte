<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	const { website }: PageData = $page.data as PageData;
</script>

<section>
	<h1>Website</h1>
	{website.name}
	{website.description}
</section>
