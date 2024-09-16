<script lang="ts">
	import type { User } from "lucia";
	import ThemeSwitch from "./theme-switch.svelte";
	import UserDropdown from "./user-dropdown.svelte";
	import Button from "../ui/button/button.svelte";

	const { user }: { user: User | null } = $props();
</script>

<div class="flex items-center justify-center gap-4">
	{#if user}
		<UserDropdown avatar={user.avatar} />
	{:else}
		<Button href="/login">Login</Button>
	{/if}
	<ThemeSwitch />
</div>
