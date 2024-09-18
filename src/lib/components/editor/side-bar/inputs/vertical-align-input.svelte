<script lang="ts">
	import {
		AlignVerticalJustifyCenter,
		AlignVerticalJustifyEnd,
		AlignVerticalJustifyStart,
		AlignVerticalSpaceAround,
		AlignVerticalSpaceBetween,
	} from "lucide-svelte";
	import * as Tabs from "$lib/components/ui/tabs/index";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	const {
		handleCustomChange,
	}: {
		handleCustomChange: (style: string, value: string | undefined) => void;
	} = $props();
</script>

<Tabs.Root
	value="start"
	class="flex w-full justify-between rounded-md border-2 border-muted p-1"
	onValueChange={(value) => handleCustomChange("align-content", value)}
>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="start"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalJustifyStart />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical align top</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="center"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalJustifyCenter />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical align center</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="space-between"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalSpaceBetween />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical space between</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="space-around"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalSpaceAround />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical space around</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="end"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignVerticalJustifyEnd />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Vertical align bottom</Tooltip.Content>
	</Tooltip.Root>
</Tabs.Root>
