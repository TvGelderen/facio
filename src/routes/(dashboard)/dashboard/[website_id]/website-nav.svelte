<script lang="ts">
	import { page } from "$app/stores";
	import { FileCode2, Image, Pencil, SlidersHorizontal } from "lucide-svelte";

	const {
		collapsed,
		websiteId,
		handleLinkClick,
	}: {
		collapsed: boolean;
		handleLinkClick: () => void;
		websiteId: string;
	} = $props();
</script>

<nav class="mt-4 w-full">
	<ul class="flex flex-col gap-1">
		<li>
			<a
				href={`/dashboard/${websiteId}/editor`}
				class={`flex items-center gap-2 rounded p-2 text-base hover:bg-primary/50 lg:text-lg ${$page.url.pathname.includes("/edit") && "bg-primary/50"}`}
				onclick={handleLinkClick}
			>
				<FileCode2 class="h-6 w-6" />
				{#if !collapsed}
					Editor
				{/if}
			</a>
		</li>
		<li>
			<a
				href={`/dashboard/${websiteId}/images`}
				class={`flex items-center gap-2 rounded p-2 text-base hover:bg-primary/50 lg:text-lg ${$page.url.pathname.includes("/images") && "bg-primary/50"}`}
				onclick={handleLinkClick}
			>
				<Image class="h-6 w-6" />
				{#if !collapsed}
					Images
				{/if}
			</a>
		</li>
		<li>
			<a
				href={`/dashboard/${websiteId}/details`}
				class={`flex items-center gap-2 rounded p-2 text-base hover:bg-primary/50 lg:text-lg ${$page.url.pathname.includes("/details") && "bg-primary/50"}`}
				onclick={handleLinkClick}
			>
				<Pencil class="h-6 w-6" />
				{#if !collapsed}
					Details
				{/if}
			</a>
		</li>
		<li>
			<a
				href={`/dashboard/${websiteId}/settings`}
				class={`flex items-center gap-2 rounded p-2 text-base hover:bg-primary/50 lg:text-lg ${$page.url.pathname.includes("/settings") && "bg-primary/50"}`}
				onclick={handleLinkClick}
			>
				<SlidersHorizontal class="h-6 w-6" />
				{#if !collapsed}
					Settings
				{/if}
			</a>
		</li>
	</ul>
</nav>
