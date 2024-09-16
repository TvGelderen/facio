<script lang="ts">
	import {
		Eye,
		EyeOff,
		Laptop,
		Redo,
		Smartphone,
		Tablet,
		Undo,
	} from "lucide-svelte";
	import { page } from "$app/stores";
	import { toast } from "svelte-sonner";
	import type { LayoutData } from "./$types";
	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowLeft } from "lucide-svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import { setEditorState } from "./editor-context.svelte";
	import ThemeSwitch from "$lib/components/custom/theme-switch.svelte";
	import { Device } from "./types";
	import * as Tabs from "$lib/components/ui/tabs/index";
	import { getEditorState } from "./editor-context.svelte";

	const { children } = $props();

	const { data }: LayoutData = $page.data as LayoutData;

	let name = $state(data.name);

	async function savePageName() {
		if (name === data.name) return;

		try {
			await fetch(`/api/page/${data.id}/setName?name=${name}`, {
				method: "POST",
			});
		} catch (err) {
			toast.error("Something went wrong updating the page name");
		}

		toast.success("Page name updated successfully");
	}

	setEditorState();

	const editor = getEditorState();
</script>

<svelte:head>
	<title>{data.website.name} - Pagegen</title>
</svelte:head>

<header
	class="flex h-[58px] items-center justify-between border-b-2 border-b-muted px-2"
>
	<div class="flex items-center gap-4">
		<Button
			class="rounded-full p-2"
			variant="secondary"
			href={`/dashboard/${data.website.id}/pages`}
		>
			<ArrowLeft />
		</Button>
		<div class="flex flex-col">
			<Input
				class="m-0 h-5 border-none p-0 text-lg"
				bind:value={name}
				onblur={savePageName}
			/>
			<span class="text-sm text-muted-foreground">Path: {data.path}</span>
		</div>
	</div>
	<div class="flex items-center gap-8">
		<div class="flex">
			<Button variant="ghost" class="p-2" onclick={editor.undo}>
				<Undo />
			</Button>
			<Button variant="ghost" class="p-2" onclick={editor.redo}>
				<Redo />
			</Button>
		</div>
		<Tabs.Root>
			<Tabs.List class="bg-transparent">
				<Tabs.Trigger
					value={Device.Desktop}
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
					onclick={() => editor.changeDevice(Device.Desktop)}
				>
					<Laptop />
				</Tabs.Trigger>
				<Tabs.Trigger
					value={Device.Tablet}
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
					onclick={() => editor.changeDevice(Device.Tablet)}
				>
					<Tablet />
				</Tabs.Trigger>
				<Tabs.Trigger
					value={Device.Mobile}
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
					onclick={() => editor.changeDevice(Device.Mobile)}
				>
					<Smartphone />
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
		<Button variant="ghost" class="p-2" onclick={editor.togglePreview}>
			{#if editor.preview}
				<EyeOff />
			{:else}
				<Eye />
			{/if}
		</Button>
	</div>
</header>

<main class="flex h-[calc(100dvh_-_58px)] w-full items-center justify-center">
	{@render children()}
</main>
