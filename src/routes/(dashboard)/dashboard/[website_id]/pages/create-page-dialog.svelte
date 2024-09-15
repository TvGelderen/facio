<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index";
	import { Button } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
	import { Label } from "$lib/components/ui/label/index";
	import type { SuperForm } from "sveltekit-superforms";

	const {
		form,
	}: {
		form: SuperForm<
			{
				name: string;
				path: string;
			},
			any
		>;
	} = $props();

	const { form: formData, errors, enhance } = form;
</script>

<Dialog.Content class="max-w-[95%] sm:max-w-[500px]">
	<Dialog.Header>
		<Dialog.Title>Create page</Dialog.Title>
	</Dialog.Header>
	<form method="POST" class="flex flex-col gap-2" use:enhance>
		<div class="flex flex-col gap-2">
			<Label for="description">Name</Label>
			<Input
				id="name"
				name="name"
				type="text"
				class={$errors.name && "ring-2 ring-destructive"}
				bind:value={$formData.name}
			/>
			{#if $errors.name}
				<span class="text-destructive">{$errors.name}</span>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<Label>Path</Label>
			<Input
				id="path"
				name="path"
				type="text"
				class={$errors.path && "ring-2 ring-destructive"}
				bind:value={$formData.path}
			/>
			{#if $errors.path}
				<span class="text-destructive">{$errors.path}</span>
			{/if}
		</div>
		<Button type="submit" class="w-fit">Create</Button>
	</form>
</Dialog.Content>
