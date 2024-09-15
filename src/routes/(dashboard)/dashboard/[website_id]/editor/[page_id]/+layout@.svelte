<script lang="ts">
	import { page } from "$app/stores";
	import type { LayoutData } from "./$types";

	const { children } = $props();

	const { data }: LayoutData = $page.data as LayoutData;
</script>

<svelte:head>
	<title>{data.website.name} - Pagegen</title>
</svelte:head>

<main>
	{@render children()}
</main>
