<script lang="ts">
	import "../app.css";
	import "@uploadthing/svelte/styles.css";
	import { Toaster } from "svelte-sonner";
	import { ModeWatcher } from "mode-watcher";

	const { children } = $props();
</script>

<ModeWatcher />

<Toaster />

{@render children()}
