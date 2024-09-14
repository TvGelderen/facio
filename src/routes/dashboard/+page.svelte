<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import { Plus } from "lucide-svelte";
	import { buttonVariants } from "$lib/components/ui/button/index";
	import * as Dialog from "$lib/components/ui/dialog/index";
	import { formSchema } from "./formSchema";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import WebsiteCard from "./website-card.svelte";
	import CreateWebsiteDialog from "./create-website-dialog.svelte";
	import { toast } from "svelte-sonner";

	let { websites, websiteForm }: PageData = $page.data as PageData;

	const form = superForm(websiteForm, {
		validators: zodClient(formSchema),
	});

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

		websites = websites.filter((website) => website.id !== id);

		toast.success("Website successfully deleted");
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
						<WebsiteCard {website} {deleteWebsite} />
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<CreateWebsiteDialog {form} />
</Dialog.Root>
