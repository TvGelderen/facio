<script lang="ts">
	import {
		AlignHorizontalJustifyCenter,
		AlignHorizontalJustifyEnd,
		AlignHorizontalJustifyStart,
		AlignHorizontalSpaceAround,
		AlignHorizontalSpaceBetween,
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
	value="flex-start"
	class="flex w-full justify-between rounded-md border-2 border-muted p-1"
	onValueChange={(value) => handleCustomChange("justify-content", value)}
>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="flex-start"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalJustifyStart />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="center"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalJustifyCenter />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align center</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="space-between"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalSpaceBetween />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal space between</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="space-around"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalSpaceAround />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal space around</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="flex-end"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignHorizontalJustifyEnd />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Horizontal align right</Tooltip.Content>
	</Tooltip.Root>
</Tabs.Root>
