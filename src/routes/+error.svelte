<script lang="ts">
	import { page } from "$app/stores";

	console.log($page.error);
</script>

<section class="flex h-[calc(100dvh_-_72px)] items-center justify-center">
	<h1
		class="mr-4 border-r-2 border-muted-foreground pr-4 text-6xl lg:mr-8 lg:pr-8 lg:text-8xl"
	>
		{$page.status}
	</h1>
	<h2 class="text-2xl text-muted-foreground lg:text-4xl">
		{$page.error?.message}
	</h2>
</section>
