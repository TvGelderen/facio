<script lang="ts">
	import {
		Eye,
		EyeOff,
		Laptop,
		Redo,
		Smartphone,
		Tablet,
		Undo,
		ArrowLeft,
		Save,
	} from "lucide-svelte";
	import { page } from "$app/stores";
	import { toast } from "svelte-sonner";
	import type { LayoutData } from "./$types";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import * as Tabs from "$lib/components/ui/tabs/index";
	import {
		setEditorState,
		getEditorState,
	} from "$lib/components/editor/editor-context.svelte";
	import { Device } from "$lib/components/editor/types";

	const { children } = $props();

	const { data }: LayoutData = $page.data as LayoutData;
	const { page_id } = $page.params;

	let name = $state(data.name);

	setEditorState();

	const editor = getEditorState();

	if (data.pageLayout !== null && data.pageLayout.elements.length > 0) {
		editor.elements = data.pageLayout.elements;
	}

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

	async function savePageLayout() {
		try {
			await editor.saveState(page_id);
			toast.success("Page saved successfully");
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong saving the current page");
		}
	}
</script>

<svelte:head>
	<title>{data.website.name} - Pagegen</title>
</svelte:head>

<header
	class={`absolute left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between border-b-2 border-b-muted bg-background px-2 transition-all duration-300 ${editor.live && "top-[-58px]"}`}
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
		<Button variant="ghost" class="p-2" onclick={editor.toggleView}>
			{#if editor.preview}
				<EyeOff />
			{:else}
				<Eye />
			{/if}
		</Button>
		<Button class="ml-4 p-2" onclick={savePageLayout}>
			<Save class="mr-2" />Save
		</Button>
	</div>
</header>

<main
	class={`flex w-full items-center justify-center ${editor.live ? "mt-0 h-dvh" : "mt-[58px] h-[calc(100dvh_-_58px)]"}`}
>
	{@render children()}
</main>
