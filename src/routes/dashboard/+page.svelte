<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import Plus from "lucide-svelte/icons/plus";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { UploadDropzone } from "@uploadthing/svelte";
	import { createUploader } from "$lib/utils/uploadthing";

	const { websites }: PageData = $page.data as PageData;

	let logo = $state(
		"https://utfs.io/f/160b1221-c9a4-4ce0-906e-218d7fddc27d-1wvcb.png",
	);

	const uploader = createUploader("logoUploader", {
		onClientUploadComplete: async (response) => {
			if (!response[0]) return;

			if (logo) {
				try {
					const file = logo.split("/").at(-1);

					console.log(file);

					await fetch(`/api/uploadthing?file=${file}`, {
						method: "DELETE",
					});
				} catch (err) {
					console.error(err);
				}
			}

			logo = response[0].url;
		},
		onUploadError: (err: Error) => {
			console.error(`Error uploading logo: ${err}`);
		},
	});
</script>

<Dialog.Root open>
	<section class="flex h-full w-full flex-col items-center justify-center">
		<div class="flex w-[95%] max-w-screen-xl justify-end">
			<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
				<Plus class="mr-2" />Create website
			</Dialog.Trigger>
		</div>
		{#if websites.length === 0}
			<Dialog.Trigger
				class={`${buttonVariants({ variant: "default" })} mt-6`}
			>
				<Plus class="mr-2" />Create your first website
			</Dialog.Trigger>
		{:else}
			{#each websites as website}
				<Card.Root>
					<Card.Header>
						<Card.Title>{website.name}</Card.Title>
					</Card.Header>
					<Card.Content>
						<div>
							{#if website.logo}
								<enhanced:img
									src={website.logo}
									alt="Website logo"
								/>
							{:else}
								<div
									class="flex items-center justify-center bg-gradient-to-br from-muted-foreground to-primary"
								>
									No logo found
								</div>
							{/if}
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		{/if}
	</section>

	<Dialog.Content class="max-w-[95%] sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Create website</Dialog.Title>
			<Dialog.Description>
				Fill in your website details and click create when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col justify-center">
			<UploadDropzone {uploader} />
			{#if logo}
				<img
					src={logo}
					alt="logo"
					class="max-h-[200px] object-contain"
				/>
			{:else}
				<div class=""></div>
			{/if}
		</div>
		<form method="post" class="flex flex-col gap-4">
			<Input id="logo" name="logo" value={logo} type="hidden" />
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Website name</Label>
				<Input
					id="name"
					placeholder="Website name"
					class="col-span-3"
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="What is your website about?"
					class="col-span-3"
				/>
			</div>
		</form>
		<Dialog.Footer>
			<Button type="submit">Create</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
