<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import Plus from "lucide-svelte/icons/plus";
	import Trash from "lucide-svelte/icons/trash";
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { UploadDropzone } from "@uploadthing/svelte";
	import { createUploader } from "$lib/utils/uploadthing";
	import { formSchema } from "./schema";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import WebsiteCard from "./website-card.svelte";

	const { websites, superValidatedForm }: PageData = $page.data as PageData;

	let logo = $state("");

	const form = superForm(superValidatedForm, {
		validators: zodClient(formSchema),
	});

	const { form: formData, errors, enhance } = form;

	const uploader = createUploader("logoUploader", {
		onClientUploadComplete: async (response) => {
			if (!response[0]) return;

			if (logo) {
				await deleteLogo();
			}

			logo = response[0].url;
		},
		onUploadError: (err: Error) => {
			console.error(`Error uploading logo: ${err}`);
		},
	});

	async function deleteLogo() {
		try {
			const file = logo.split("/").at(-1);
			await fetch(`/api/uploadthing?file=${file}`, {
				method: "DELETE",
			});
			logo = "";
		} catch (err) {
			console.error(err);
		}
	}
</script>

<Dialog.Root>
	<section class="flex h-full w-full flex-col items-center justify-center">
		<div class="flex w-[95%] max-w-screen-xl flex-col items-center gap-4">
			<Dialog.Trigger
				class={`${buttonVariants({ variant: "outline" })} self-end`}
			>
				<Plus class="mr-2" />Create website
			</Dialog.Trigger>
			{#if websites.length === 0}
				<Dialog.Trigger
					class={`${buttonVariants({ variant: "default" })} mt-6`}
				>
					<Plus class="mr-2" />Create your first website
				</Dialog.Trigger>
			{:else}
				<div
					class="flex w-full flex-wrap items-center justify-center gap-8"
				>
					{#each websites as website}
						<WebsiteCard {website} />
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<Dialog.Content class="max-w-[95%] sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Create website</Dialog.Title>
			<Dialog.Description>
				Fill in your website details and click create when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col justify-center">
			<span>Website Logo</span>
			{#if !logo && !$formData?.logo}
				<UploadDropzone {uploader} class="bg-secondary/50" />
			{:else}
				<div class="group relative mx-auto h-[200px] w-fit">
					<img
						src={logo ? logo : ($formData.logo as string)}
						alt="logo"
						class="h-full w-full rounded-xl border-2 border-muted"
					/>
					<Button
						on:click={deleteLogo}
						variant="destructive"
						class="absolute right-0 top-0 hidden !px-2 py-1 group-hover:block"
					>
						<Trash />
					</Button>
				</div>
			{/if}
		</div>
		<form method="POST" class="flex flex-col gap-2" use:enhance>
			<div>
				<Input
					id="logo"
					name="logo"
					type="hidden"
					bind:value={$formData.logo}
				/>
			</div>
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
				<Label>Description</Label>
				<Textarea
					id="description"
					name="description"
					class={$errors.description && "ring-2 ring-destructive"}
					bind:value={$formData.description}
				/>
				{#if $errors.description}
					<span class="text-destructive">{$errors.description}</span>
				{/if}
			</div>
			<Button type="submit" class="w-fit">Create</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
