<script lang="ts">
	import type { User } from "lucia";
	import ThemeSwitch from "./theme-switch.svelte";

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
		class="absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 md:flex"
	>
		<ul class="flex items-center gap-8">
			<li><a href="/">About</a></li>
			<li><a href="/">Pricing</a></li>
			<li><a href="/">Documentation</a></li>
			<li><a href="/">Features</a></li>
		</ul>
	</nav>

	<div class="flex items-center justify-center gap-4">
		{#if user}
			<a href="/dashboard">Profile</a>
		{:else}
			<a
				href="/login"
				class="rounded-md bg-primary px-4 py-2 transition-colors hover:bg-primary/75"
			>
				Login
			</a>
		{/if}
		<ThemeSwitch />
	</div>
</header>
