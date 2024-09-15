<script lang="ts">
	import { page } from "$app/stores";
	import { ChevronsLeft, Menu, UploadIcon } from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar/index";
	import { Button } from "$lib/components/ui/button/index";
	import type { LayoutData } from "./$types";
	import UserDropdown from "$lib/components/custom/user-dropdown.svelte";
	import ThemeSwitch from "$lib/components/custom/theme-switch.svelte";
	import WebsiteNav from "./website-nav.svelte";

	const { children } = $props();

	const { user, website }: LayoutData = $page.data as LayoutData;

	let mobile = $state(true);
	let sidePanelCollapsed = $state(false);

	const toggleSidePanel = () => (sidePanelCollapsed = !sidePanelCollapsed);

	const handleLinkClick = () => {
		if (mobile) {
			sidePanelCollapsed = true;
		}
	};

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
		class={`relative flex w-[95%] flex-col border-r-2 border-r-muted bg-background p-2 transition-all ${mobile ? "!absolute inset-y-0 left-0 z-20 max-w-[360px] p-4" : sidePanelCollapsed ? "max-w-[58px] items-center" : "max-w-[360px]"} ${mobile && sidePanelCollapsed && "ml-[-360px]"}`}
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
		<WebsiteNav
			collapsed={sidePanelCollapsed}
			websiteId={website.id}
			{handleLinkClick}
		/>

		<Button
			variant="ghost"
			class="absolute bottom-1 right-1 p-2"
			on:click={toggleSidePanel}
		>
			<ChevronsLeft
				class="h-8 w-8 transition-all"
				style={`${sidePanelCollapsed && "transform: scale(-1, 1)"}`}
			/>
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
