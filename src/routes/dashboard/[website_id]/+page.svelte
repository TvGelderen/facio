<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	const { website }: PageData = $page.data as PageData;
</script>

<section class="h-full">
	<p>{website.name}</p>
	<p>{website.description}</p>
</section>
