<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import { EllipsisVertical, Plus } from "lucide-svelte";
	import type { PageData } from "./$types";
	import * as Card from "$lib/components/ui/card/index";
	import { Root, Trigger } from "$lib/components/ui/dialog/index";
	import { buttonVariants } from "$lib/components/ui/button";
	import CreatePageDialog from "./create-page-dialog.svelte";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { pageFormSchema } from "./pageFormSchema";

	const { website, pageForm }: PageData = $page.data as PageData;

	const form = superForm(pageForm, {
		validators: zodClient(pageFormSchema),
	});
</script>

<Root>
	<section>
		<div class="mb-4 flex w-full items-center justify-between">
			<h1 class="text-2xl lg:text-3xl">Pages</h1>
			<Trigger
				class={`${buttonVariants({ variant: "outline" })} self-end`}
			>
				<Plus class="mr-2 h-4 w-4" />Create page
			</Trigger>
		</div>
		<div class="flex gap-4">
			{#each website.pages as page}
				<Card.Root
					class="relative flex w-[250px] flex-col items-center"
				>
					<Card.Header>
						<Card.Title>
							<a
								href={`/dashboard/${website.id}/editor/${page.id}`}
								class="text-lg lg:text-xl"
							>
								{page.name}
							</a>
						</Card.Title>
					</Card.Header>
					<Card.Footer>
						{page.path}
					</Card.Footer>
					<Button class="absolute right-2 top-0 p-0" variant="ghost">
						<EllipsisVertical class="h-5 w-5" />
					</Button>
				</Card.Root>
			{/each}
		</div>
	</section>

	<CreatePageDialog {form} />
</Root>
