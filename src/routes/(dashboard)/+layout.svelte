<script lang="ts">
	import { page } from "$app/stores";
	import ThemeSwitch from "$lib/components/custom/theme-switch.svelte";
	import UserDropdown from "$lib/components/custom/user-dropdown.svelte";
	import type { LayoutData } from "./$types";

	const { children } = $props();

	const { user }: LayoutData = $page.data as LayoutData;
</script>

<svelte:head>
	<title>Dashboard - Pagegen</title>
</svelte:head>

<header class="flex justify-end p-4">
	<div class="flex items-center justify-center gap-4">
		<UserDropdown avatar={user.avatar} />
		<ThemeSwitch />
	</div>
</header>

<main>
	{@render children()}
</main>
