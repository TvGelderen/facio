<script lang="ts">
	import { page } from "$app/stores";
	import {
		FileCode2,
		Image,
		Pencil,
		SlidersHorizontal,
		UploadIcon,
	} from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import type { LayoutData } from "./$types";

	const { children } = $props();

	const { website }: LayoutData = $page.data as LayoutData;
</script>

<div class="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-[360px_1fr]">
	<div class="border-r-2 border-r-muted p-4">
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
			<ul class="flex flex-col gap-4">
				<li>
					<a
						href={`/dashboard/${website.id}/edit`}
						class="flex items-center gap-2 text-sm lg:text-base"
					>
						<FileCode2 class="h-5 w-5" />Edit
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/images`}
						class="flex items-center gap-2 text-sm lg:text-base"
					>
						<Image class="h-5 w-5" />Images
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/details`}
						class="flex items-center gap-2 text-sm lg:text-base"
					>
						<Pencil class="h-5 w-5" />Details
					</a>
				</li>
				<li>
					<a
						href={`/dashboard/${website.id}/settings`}
						class="flex items-center gap-2 text-sm lg:text-base"
					>
						<SlidersHorizontal class="h-5 w-5" />Settings
					</a>
				</li>
			</ul>
		</nav>
	</div>

	<section class="h-full w-full bg-primary/50">
		{@render children()}
	</section>
</div>
