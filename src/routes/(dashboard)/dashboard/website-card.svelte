<script lang="ts">
	import {
		EllipsisVertical,
		PanelsTopLeft,
		Pencil,
		Settings,
		Trash,
	} from "lucide-svelte";
	import * as Card from "$lib/components/ui/card/index";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
	import type { WebsiteRecord } from "$lib/types";

	const {
		website,
		onDelete,
	}: {
		website: WebsiteRecord;
		onDelete: (website: WebsiteRecord) => void;
	} = $props();

	const websiteUrl = `/dashboard/${website.id}/pages`;
</script>

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
					<DropdownMenu.Item
						on:click={() => onDelete(website)}
						class="cursor-pointer"
					>
						<Trash class="mr-2 h-4 w-4 text-destructive" />
						<span class="text-destructive">Delete</span>
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
