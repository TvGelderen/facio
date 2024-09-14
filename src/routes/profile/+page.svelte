<script lang="ts">
	import { page } from "$app/stores";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { ActionData, PageData } from "../profile/$types";
	import { toast } from "svelte-sonner";

	const { user }: PageData = $page.data as PageData;
	const form: ActionData = $page.form;

	$effect(() => {
		if (form?.success) {
			toast.success("Profile updated successfully");
		}
	});
</script>

<section class="mt-12 flex h-full w-full items-center justify-center">
	<Card.Root class="w-[95%] max-w-md">
		<Card.Header>
			<Card.Title class="text-xl">Profile</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="post" class="flex flex-col gap-4">
				<div class="flex w-full flex-col gap-2">
					<Label for="username" class="text-muted-foreground">
						Username
					</Label>
					<Input
						type="text"
						id="username"
						placeholder="username"
						name="username"
						class={form?.errors?.username &&
							"!ring-2 !ring-red-500/75 !ring-offset-2"}
						value={form?.data?.username ?? user.username}
					/>
					{#if form?.errors?.username}
						<span class="text-xs text-red-500/75">
							{form?.errors.username[0]}
						</span>
					{/if}
				</div>
				<div class="flex w-full flex-col gap-2">
					<Label for="email" class="text-muted-foreground">
						Email
					</Label>
					<Input
						type="email"
						id="email"
						placeholder="Email"
						name="email"
						class={form?.errors?.email &&
							"!ring-2 !ring-red-500/75 !ring-offset-2"}
						value={form?.data?.email ?? user.email}
					/>
					{#if form?.errors?.email}
						<span class="text-xs text-red-500/75">
							{form?.errors.email[0]}
						</span>
					{/if}
				</div>
				<Button type="submit">Save</Button>
			</form>
		</Card.Content>
	</Card.Root>
</section>
