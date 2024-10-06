<script lang="ts">
	import { page } from "$app/stores";
	import HeaderRight from "$lib/components/custom/header-right.svelte";
	import type { LayoutData } from "./$types";

	const { children } = $props();

	const { user }: LayoutData = $page.data as LayoutData;
</script>

<svelte:head>
	<title>Dashboard - Facio</title>
</svelte:head>

<header class="flex justify-end p-4">
	<HeaderRight {user} />
</header>

<main>
	{@render children()}
</main>
