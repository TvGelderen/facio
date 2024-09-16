<script lang="ts">
	import type { User } from "lucia";
	import HeaderRight from "./header-right.svelte";

	const {
		user,
	}: {
		user: User | null;
	} = $props();
</script>

<header class="relative flex w-full items-center justify-between p-4">
	<div>
		<span class="text-2xl font-bold">Pagegen.</span>
	</div>

	<nav
		class="absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 md:!flex"
	>
		<ul class="flex items-center gap-8">
			<li><a href="/">About</a></li>
			<li><a href="/">Pricing</a></li>
			<li><a href="/">Documentation</a></li>
			<li><a href="/">Features</a></li>
		</ul>
	</nav>

	<HeaderRight {user} />
</header>
