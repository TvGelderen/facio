<script lang="ts">
	import Label from "$lib/components/ui/label/label.svelte";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import type * as CSS from "csstype";
	import InputWithUnit from "./input-with-unit.svelte";

	const {
		styles,
		handleChange,
	}: {
		styles: CSS.Properties | undefined;
		handleChange: (event: Event) => void;
	} = $props();
</script>

<Label class="col-span-2 mb-[-14px]">Padding</Label>
<Tooltip.Root>
	<Tooltip.Trigger class="flex h-full items-center">
		<Label
			for="paddingLeft"
			class="flex h-full items-center rounded-l-md border !border-r-0 border-muted px-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-align-horizontal-space-around"
			>
				<rect width="6" height="10" x="9" y="7" rx="2" />
				<path d="M4 22V2" />
			</svg>
		</Label>
		<InputWithUnit
			id="paddingLeft"
			value={styles?.paddingLeft}
			unit="px"
			type="number"
			placeholder="0"
			{handleChange}
		/>
	</Tooltip.Trigger>
	<Tooltip.Content>Padding Left</Tooltip.Content>
</Tooltip.Root>
<Tooltip.Root>
	<Tooltip.Trigger class="flex h-full items-center">
		<Label
			for="paddingTop"
			class="flex h-full items-center rounded-l-md border !border-r-0 border-muted px-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-align-vertical-space-around"
			>
				<rect width="10" height="6" x="7" y="9" rx="2" />
				<path d="M22 4H2" />
			</svg>
		</Label>
		<InputWithUnit
			id="paddingTop"
			value={styles?.paddingTop}
			unit="px"
			type="number"
			placeholder="0"
			{handleChange}
		/>
	</Tooltip.Trigger>
	<Tooltip.Content>Padding Top</Tooltip.Content>
</Tooltip.Root>
<Tooltip.Root>
	<Tooltip.Trigger class="flex h-full items-center">
		<Label
			for="paddingRight"
			class="flex h-full items-center rounded-l-md border !border-r-0 border-muted pl-1 pr-3"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-align-horizontal-space-around"
			>
				<rect width="6" height="10" x="9" y="7" rx="2" />
				<path d="M20 22V2" />
			</svg>
		</Label>
		<InputWithUnit
			id="paddingRight"
			value={styles?.paddingRight}
			unit="px"
			type="number"
			placeholder="0"
			{handleChange}
		/>
	</Tooltip.Trigger>
	<Tooltip.Content>Padding Right</Tooltip.Content>
</Tooltip.Root>
<Tooltip.Root>
	<Tooltip.Trigger class="flex h-full items-center">
		<Label
			for="paddingBottom"
			class="flex h-full items-center rounded-l-md border !border-r-0 border-muted px-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-align-vertical-space-around"
			>
				<rect width="10" height="6" x="7" y="9" rx="2" />
				<path d="M22 20H2" />
			</svg>
		</Label>
		<InputWithUnit
			id="paddingBottom"
			value={styles?.paddingBottom}
			unit="px"
			type="number"
			placeholder="0"
			{handleChange}
		/>
	</Tooltip.Trigger>
	<Tooltip.Content>Padding Bottom</Tooltip.Content>
</Tooltip.Root>
