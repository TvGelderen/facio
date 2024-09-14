<script lang="ts">
	import EllipsisVertical from "lucide-svelte/icons/ellipsis-vertical";
	import PanelsTopLeft from "lucide-svelte/icons/panels-top-left";
	import Pencil from "lucide-svelte/icons/pencil";
	import Settings from "lucide-svelte/icons/settings";
	import Trash from "lucide-svelte/icons/trash";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { Website } from "$lib/types";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import { buttonVariants } from "$lib/components/ui/button";

	const { website }: { website: Website } = $props();

	const websiteUrl = `/dashboard/${website.id}`;

	const requiredDeleteCommand = `sudo delete ${website.name}`;
	let deleteCommand = $state("");
</script>

<Dialog.Root>
	<Card.Root class="w-[95%] max-w-[600px]">
		<Card.Header class="relative">
			<Card.Title>
				<a href={websiteUrl}>{website.name}</a>
			</Card.Title>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="absolute right-2 top-2">
					<EllipsisVertical />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>{website.name}</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item disabled>
							<a
								href={websiteUrl}
								class="flex h-full w-full items-center"
							>
								<PanelsTopLeft class="mr-2 h-4 w-4" />
								<span>View</span>
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<a href={websiteUrl} class="flex items-center">
								<Pencil class="mr-2 h-4 w-4" />
								<span>Edit</span>
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item disabled>
							<Settings class="mr-2 h-4 w-4" />
							<span>Settings</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<Dialog.Trigger
								class="flex h-full w-full items-center"
							>
								<Trash class="mr-2 h-4 w-4 text-destructive" />
								<span class="text-destructive">Delete</span>
							</Dialog.Trigger>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Card.Header>
		<Card.Content>
			<div class="h-[300px]">
				{#if website.logo}
					<img
						src={website.logo}
						alt="Website logo"
						class="h-full w-full rounded-xl border-2 border-muted object-cover"
					/>
				{:else}
					<div
						class="flex h-full w-full items-center justify-center rounded-xl border-2 border-muted bg-gradient-to-br from-primary/50 to-muted-foreground/50"
					>
						<span class="text-lg lg:text-xl">No logo found</span>
					</div>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>

	<Dialog.Content class="w-[95%] max-w-md">
		<Dialog.Header>
			<Dialog.Title>Delete Website</Dialog.Title>
			<Dialog.Description>
				You are about to delete your website:
				<br />
				<strong>{website.name}</strong>
				<br />
				<br />
				This action is permanent, if you wish to process, please type '{requiredDeleteCommand}'
			</Dialog.Description>
		</Dialog.Header>
		<form method="post" action={`/api/website/${website.id}/delete`}>
			<Input
				id="delete-command"
				bind:value={deleteCommand}
				placeholder="sudo delete ..."
				class="col-span-3"
			/>
			<Dialog.Footer class="mt-4">
				<Dialog.Close class={buttonVariants({ variant: "secondary" })}>
					Cancel
				</Dialog.Close>
				<Button
					type="submit"
					variant="destructive"
					disabled={deleteCommand !== requiredDeleteCommand}
				>
					<Trash class="mr-2 h-4 w-4" />Delete Website
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
