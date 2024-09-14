<script lang="ts">
	import "../app.css";
	import "iconify-icon";
	import "@uploadthing/svelte/styles.css";
	import { page } from "$app/stores";
	import Header from "$lib/components/custom/header.svelte";
	import { ModeWatcher } from "mode-watcher";

	const { children } = $props();

	const { user } = $page.data;
</script>

<ModeWatcher />

<svelte:head>
	<title>Pagegen</title>
</svelte:head>

<Header {user} />

<main class="min-h-[calc(100dvh_-_72px)]">
	{@render children()}
</main>
