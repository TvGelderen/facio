<script lang="ts">
	import {
		AlignVerticalJustifyCenter,
		AlignVerticalJustifyEnd,
		AlignVerticalJustifyStart,
	} from "lucide-svelte";
	import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	const {
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
	onValueChange={(value) => handleCustomChange("alignItems", value)}
	class="flex w-full justify-between rounded-md border-2 border-muted p-1"
>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="flex-start"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalJustifyStart />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical align top</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="center"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalJustifyCenter />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical align center</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="flex-end"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalJustifyEnd />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical align bottom</Tooltip.Content>
	</Tooltip.Root>
</ToggleGroup.Root>
