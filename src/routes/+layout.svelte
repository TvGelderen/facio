<script lang="ts">
	import "../app.css";
	import "iconify-icon";
	import { page } from "$app/stores";
	import Header from "$lib/components/custom/header.svelte";
	import { ModeWatcher } from "mode-watcher";

	const { children } = $props();

	const { user } = $page.data;
</script>

<ModeWatcher />

<Header {user} />

<svelte:head>
	<title>Pagegen</title>
</svelte:head>

<main>
	{@render children()}
</main>
