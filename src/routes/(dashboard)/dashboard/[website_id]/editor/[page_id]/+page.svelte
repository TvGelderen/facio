<script lang="ts">
	import { ArrowLeft } from "lucide-svelte";
	import type { PageData } from "./$types";
	import { page } from "$app/stores";

	const { data }: PageData = $page.data as PageData;
</script>

<header class="border-b-2 border-b-muted p-4">
	<div class="flex items-center gap-4">
		<ArrowLeft />
		<div class="flex flex-col gap-1">
			<h4 class="text-lg">{data.name}</h4>
			<span class="text-muted-foreground">Path: {data.path}</span>
		</div>
	</div>
</header>

<section class="h-full w-full">
	<div></div>
</section>
