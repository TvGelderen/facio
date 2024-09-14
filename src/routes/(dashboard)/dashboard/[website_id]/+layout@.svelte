<script lang="ts">
	import { page } from "$app/stores";
	import {
		ChevronsLeft,
		FileCode2,
		Image,
		Pencil,
		SlidersHorizontal,
		UploadIcon,
	} from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar/index";
	import { Button } from "$lib/components/ui/button/index";
	import type { LayoutData } from "./$types";
	import UserDropdown from "$lib/components/custom/user-dropdown.svelte";
	import ThemeSwitch from "$lib/components/custom/theme-switch.svelte";

	const { children } = $props();

	const { user, website }: LayoutData = $page.data as LayoutData;

	let sidePanelCollapsed = $state(false);

	const toggleSidePanel = () => sidePanelCollapsed != sidePanelCollapsed;
</script>

<svelte:head>
	<title>{website.name} - Pagegen</title>
</svelte:head>

<div class={`grid lg:grid-cols-[360px_1fr]`}>
	<div class="relative border-r-2 border-r-muted bg-background p-4">
		<div class="flex items-center gap-4">
			<Avatar.Root class="h-12 w-12">
				<Avatar.Image src={website.logo} alt="user avatar" />
				<Avatar.Fallback><UploadIcon /></Avatar.Fallback>
			</Avatar.Root>
			{#if website.logo}
				<img src={website.logo} alt="Website logo" />
			{/if}
			<h2 class="text-2xl lg:text-4xl">{website.name}</h2>
		</div>
		<nav class="mt-4">
			<ul class="flex flex-col gap-1">
				<li>
					<a
						href={`/dashboard/${website.id}/edit`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/edit") && "bg-primary/50"}`}
					>
						<FileCode2 class="h-5 w-5" />Edit
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/images`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/images") && "bg-primary/50"}`}
					>
						<Image class="h-5 w-5" />Images
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/details`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/details") && "bg-primary/50"}`}
					>
						<Pencil class="h-5 w-5" />Details
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/settings`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/settings") && "bg-primary/50"}`}
					>
						<SlidersHorizontal class="h-5 w-5" />Settings
					</a>
				</li>
			</ul>
		</nav>

		<Button
			variant="ghost"
			class="absolute bottom-2 right-2 p-2"
			on:click={toggleSidePanel}
		>
			<ChevronsLeft class="h-8 w-8" />
		</Button>
	</div>

	<div>
		<header class="flex justify-end border-b-2 border-b-muted p-4">
			<div class="flex items-center justify-center gap-4">
				<UserDropdown avatar={user.avatar} />
				<ThemeSwitch />
			</div>
		</header>

		<main class="h-[calc(100dvh_-_72px)] w-full bg-secondary/50">
			{@render children()}
		</main>
	</div>
</div>
