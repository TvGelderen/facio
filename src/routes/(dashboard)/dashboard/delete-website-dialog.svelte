<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index";
	import { buttonVariants } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
	import { Trash } from "lucide-svelte";
	import type { WebsiteRecord } from "$lib/types";

	const {
		selectedWebsite,
		deleteWebsite,
		closeDialog,
	}: {
		selectedWebsite: WebsiteRecord | null;
		deleteWebsite: (id: string) => void;
		closeDialog: () => void;
	} = $props();

	let deleteCommand = $state("");

	let requiredDeleteCommand = $derived(() => {
		if (selectedWebsite) {
			return `sudo delete ${selectedWebsite.name}`;
		}
		return "";
	});

	$effect(() => {
		if (selectedWebsite) {
			deleteCommand = "";
		}
	});
</script>

<AlertDialog.Root open={!!selectedWebsite}>
	<AlertDialog.Content class="w-[95%] max-w-md">
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Website</AlertDialog.Title>
			<AlertDialog.Description>
				You are about to delete your website:
				<br />
				<strong>{selectedWebsite?.name}</strong>
				<br />
				<br />
				This action is permanent, if you wish to proceed, please type
				<strong>'{requiredDeleteCommand()}'</strong>
			</AlertDialog.Description>
		</AlertDialog.Header>
		<Input
			id="delete-command"
			bind:value={deleteCommand}
			placeholder={requiredDeleteCommand()}
		/>
		<AlertDialog.Footer class="mt-2">
			<AlertDialog.Cancel
				class={buttonVariants({ variant: "secondary" })}
				onclick={closeDialog}
			>
				Cancel
			</AlertDialog.Cancel>
			<AlertDialog.Action
				disabled={deleteCommand !== requiredDeleteCommand()}
				class={`${buttonVariants({ variant: "destructive" })} mt-2`}
				onclick={() =>
					selectedWebsite && deleteWebsite(selectedWebsite.id)}
			>
				<Trash class="mr-2 h-4 w-4" />Delete Website
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
