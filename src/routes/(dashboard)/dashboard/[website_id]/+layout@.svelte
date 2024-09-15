<script lang="ts">
	import { page } from "$app/stores";
	import {
		ChevronsLeft,
		ChevronsRight,
		FileCode2,
		Image,
		Menu,
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

	let mobile = $state(true);
	let sidePanelCollapsed = $state(false);

	const toggleSidePanel = () => (sidePanelCollapsed = !sidePanelCollapsed);

	$effect(() => {
		mobile = window.innerWidth < 1024;
		window.addEventListener("resize", () => {
			mobile = window.innerWidth < 1024;
		});
	});
</script>

<svelte:head>
	<title>{website.name} - Pagegen</title>
</svelte:head>

<div class="relative flex w-full">
	{#if mobile && !sidePanelCollapsed}
		<div
			class="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm"
			onclick={toggleSidePanel}
			onkeyup={toggleSidePanel}
			role="button"
			tabindex="0"
		></div>
	{/if}
	<div
		class={`relative flex flex-col border-r-2 border-r-muted bg-background transition-all ${mobile ? "!absolute inset-y-0 left-0 z-20 w-[95%] max-w-[360px] p-4" : sidePanelCollapsed ? "w-[58px] items-center p-2" : "w-[360px] p-4"} ${mobile && sidePanelCollapsed && "ml-[-360px]"}`}
	>
		<div
			class={`flex items-center gap-4 ${sidePanelCollapsed && "justify-center"}`}
		>
			<Avatar.Root class="h-12 w-12">
				<Avatar.Image src={website.logo} alt="user avatar" />
				<Avatar.Fallback><UploadIcon /></Avatar.Fallback>
			</Avatar.Root>
			{#if !sidePanelCollapsed}
				<h2 class="text-2xl lg:text-3xl">{website.name}</h2>
			{/if}
		</div>
		<nav class="mt-4 w-full">
			<ul class="flex flex-col gap-1">
				<li>
					<a
						href={`/dashboard/${website.id}/edit`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/edit") && "bg-primary/50"}`}
						onclick={toggleSidePanel}
					>
						{#if !sidePanelCollapsed}
							<FileCode2 class="h-6 w-6" />Edit
						{:else}
							<FileCode2 class="h-6 w-6" />
						{/if}
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/images`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/images") && "bg-primary/50"}`}
						onclick={toggleSidePanel}
					>
						{#if !sidePanelCollapsed}
							<Image class="h-6 w-6" />Images
						{:else}
							<Image class="h-6 w-6" />
						{/if}
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/details`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/details") && "bg-primary/50"}`}
						onclick={toggleSidePanel}
					>
						{#if !sidePanelCollapsed}
							<Pencil class="h-6 w-6" />Details
						{:else}
							<Pencil class="h-6 w-6" />
						{/if}
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/settings`}
						class={`flex items-center gap-2 rounded p-2 text-sm hover:bg-primary/50 lg:text-base ${$page.url.pathname.includes("/settings") && "bg-primary/50"}`}
						onclick={toggleSidePanel}
					>
						{#if !sidePanelCollapsed}
							<SlidersHorizontal class="h-6 w-6" />Settings
						{:else}
							<SlidersHorizontal class="h-6 w-6" />
						{/if}
					</a>
				</li>
			</ul>
		</nav>

		<Button
			variant="ghost"
			class="absolute bottom-1 right-1 p-2"
			on:click={toggleSidePanel}
		>
			{#if sidePanelCollapsed}
				<ChevronsRight class="h-8 w-8" />
			{:else}
				<ChevronsLeft class="h-8 w-8" />
			{/if}
		</Button>
	</div>

	<div class="w-full">
		<header
			class={`flex border-b-2 border-b-muted p-2 ${mobile ? "justify-between" : "justify-end "}`}
		>
			{#if mobile}
				<Button
					variant="ghost"
					class="self-start p-2"
					on:click={toggleSidePanel}
				>
					<Menu class="h-8 w-8" />
				</Button>
			{/if}
			<div class="flex items-center justify-center gap-4">
				<UserDropdown avatar={user.avatar} />
				<ThemeSwitch />
			</div>
		</header>

		<main class="h-[calc(100dvh_-_58px)] w-full bg-secondary/50 p-4">
			{@render children()}
		</main>
	</div>
</div>
