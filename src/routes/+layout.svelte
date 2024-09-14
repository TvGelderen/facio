<script lang="ts">
	import "../app.css";
	import "iconify-icon";
	import "@uploadthing/svelte/styles.css";
	import { page } from "$app/stores";
	import Header from "$lib/components/custom/header.svelte";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";

	const { children } = $props();

	const { user } = $page.data;
</script>

<ModeWatcher />

<Toaster />

<svelte:head>
	<title>Pagegen</title>
</svelte:head>

<Header {user} />

<main class="min-h-[calc(100dvh_-_72px)]">
	{@render children()}
</main>
