<script lang="ts">
	import "../app.css";
	import "@uploadthing/svelte/styles.css";
	import { Toaster } from "svelte-sonner";
	import { ModeWatcher } from "mode-watcher";

	const { children } = $props();
</script>

<svelte:head>
	<title>Pagegen</title>
</svelte:head>

<ModeWatcher />

<Toaster />

{@render children()}
