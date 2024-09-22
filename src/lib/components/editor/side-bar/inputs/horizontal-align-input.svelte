<script lang="ts">
	import {
		AlignHorizontalJustifyCenter,
		AlignHorizontalJustifyEnd,
		AlignHorizontalJustifyStart,
		AlignHorizontalSpaceAround,
		AlignHorizontalSpaceBetween,
	} from "lucide-svelte";
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	let {
		value,
		handleCustomChange,
	}: {
		value: string | undefined;
		handleCustomChange: (style: string, value: string | undefined) => void;
	} = $props();
</script>

<ToggleGroup.Root
	type="single"
	value={value ?? "flex-start"}
	onValueChange={(value) => handleCustomChange("justifyContent", value)}
	class="flex w-full justify-between rounded-md border-2 border-muted p-1"
>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="flex-start"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalJustifyStart />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="center"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalJustifyCenter />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="space-between"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalSpaceBetween />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="space-around"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalSpaceAround />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="flex-end"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalJustifyEnd />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align left</Tooltip.Content>
	</Tooltip.Root>
</ToggleGroup.Root>
