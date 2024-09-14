<script lang="ts">
	import "../app.css";
	import "@uploadthing/svelte/styles.css";
	import { page } from "$app/stores";
	import Header from "$lib/components/custom/header.svelte";
	import type { LayoutData } from "./$types";
	import { Toaster } from "svelte-sonner";
	import { ModeWatcher } from "mode-watcher";

	const { children } = $props();

	const { user }: LayoutData = $page.data as LayoutData;
</script>

<ModeWatcher />

<Toaster />

<Header {user} />

<main class="min-h-[calc(100dvh_-_72px)]">
	{@render children()}
</main>
