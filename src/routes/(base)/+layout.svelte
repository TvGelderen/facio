<script lang="ts">
	import { page } from "$app/stores";
	import Header from "$lib/components/custom/header.svelte";
	import type { LayoutData } from "./$types";

	const { children } = $props();

	const { user }: LayoutData = $page.data as LayoutData;
</script>

<Header {user} />

<main class="min-h-[calc(100dvh_-_72px)]">
	{@render children()}
</main>
