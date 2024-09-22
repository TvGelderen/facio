<script lang="ts">
	import {
		AlignCenter,
		AlignJustify,
		AlignLeft,
		AlignRight,
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
	value={value ?? "left"}
	onValueChange={(value) => handleCustomChange("text-align", value)}
	class="flex w-full justify-between rounded-md border-2 border-muted p-1"
>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="left"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignLeft />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="center"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignCenter />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Align center</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="right"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignRight />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Align right</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<ToggleGroup.Item
				value="justify"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignJustify />
			</ToggleGroup.Item>
		</Tooltip.Trigger>
		<Tooltip.Content>Justify</Tooltip.Content>
	</Tooltip.Root>
</ToggleGroup.Root>
