<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import { Plus } from "lucide-svelte";
	import { buttonVariants } from "$lib/components/ui/button/index";
	import * as Dialog from "$lib/components/ui/dialog/index";
	import { Button } from "$lib/components/ui/button/index";
	import { websiteFormSchema } from "./websiteFormSchema";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import WebsiteCard from "./website-card.svelte";
	import CreateWebsiteDialog from "./create-website-dialog.svelte";
	import DeleteWebsiteDialog from "./delete-website-dialog.svelte";
	import { toast } from "svelte-sonner";
	import type { WebsiteRecord } from "$lib/types";

	let { websites, websiteForm }: PageData = $page.data as PageData;

	const form = superForm(websiteForm, {
		validators: zodClient(websiteFormSchema),
	});

	let websiteArray = $state<WebsiteRecord[]>(websites);
	let selectedWebsite = $state<WebsiteRecord | null>(null);
	let createWebsite = $state(false);

	async function deleteWebsite(id: string) {
		try {
			await fetch(`/api/website/${id}`, {
				method: "DELETE",
			});
		} catch (err) {
			console.error(err);
			toast.error(
				"Something went wrong deleting the website, please try again later",
			);
			return;
		}

		websiteArray = websiteArray.filter((website) => website.id !== id);
		selectedWebsite = null;

		toast.success("Website successfully deleted");
	}

	function openDeleteDialog(website: WebsiteRecord) {
		selectedWebsite = website;
	}
</script>

<section class="flex h-full w-full flex-col items-center justify-center">
	<div class="flex w-[95%] max-w-screen-xl flex-col items-center gap-4">
		<Button
			variant="outline"
			class="self-end"
			onclick={() => (createWebsite = true)}
		>
			<Plus class="mr-2" />Create website
		</Button>
		{#if websiteArray.length === 0}
			<Button
				variant="default"
				class="mt-6"
				onclick={() => (createWebsite = true)}
			>
				<Plus class="mr-2" />Create your first website
			</Button>
		{:else}
			<div
				class="flex w-full flex-wrap items-center justify-center gap-4"
			>
				{#each websiteArray as website (website.id)}
					<WebsiteCard {website} onDelete={openDeleteDialog} />
				{/each}
				{#if websiteArray.length % 2 !== 0}
					<div class="w-[95%] max-w-[600px]"></div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<Dialog.Root bind:open={createWebsite}>
	<CreateWebsiteDialog {form} />
</Dialog.Root>

<DeleteWebsiteDialog
	{selectedWebsite}
	{deleteWebsite}
	closeDialog={() => (selectedWebsite = null)}
/>
