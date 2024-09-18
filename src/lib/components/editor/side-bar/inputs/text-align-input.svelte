<script lang="ts">
	import {
		AlignCenter,
		AlignJustify,
		AlignLeft,
		AlignRight,
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
	id="text-align"
	value="left"
	class="flex w-full justify-between rounded-md border-2 border-muted p-1"
	onValueChange={(value) => handleCustomChange("text-align", value)}
>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="left"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignLeft />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Align left</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="center"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignCenter />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Align center</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="right"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignRight />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Align right</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Tabs.Trigger
				value="justify"
				class="h-10 w-10 p-0 data-[state=active]:bg-muted"
			>
				<AlignJustify />
			</Tabs.Trigger>
		</Tooltip.Trigger>
		<Tooltip.Content>Justify</Tooltip.Content>
	</Tooltip.Root>
</Tabs.Root>
