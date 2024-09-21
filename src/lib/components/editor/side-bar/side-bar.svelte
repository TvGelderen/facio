<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Component, Database, Layers, Palette } from "lucide-svelte";
	import ComponentsTab from "./components-tab.svelte";
	import LayersTab from "./layers-tab.svelte";
	import StylesTab from "./styles-tab.svelte";

	const { hidden }: { hidden: boolean } = $props();
</script>

<Tabs.Root value="settings" orientation="vertical">
	<div
		class={`relative flex h-full w-[380px] items-start border-l-2 border-l-muted transition-all duration-300 ${hidden && "mr-[-380px]"}`}
	>
		<div class="w-full">
			<Tabs.Content value="settings" class="px-2">
				<StylesTab />
			</Tabs.Content>
			<Tabs.Content value="components" class="px-2">
				<ComponentsTab />
			</Tabs.Content>
			<Tabs.Content value="layers" class="px-2">
				<LayersTab />
			</Tabs.Content>
		</div>
		<div class="h-full border-l-2 border-l-muted">
			<Tabs.List
				class="flex h-full flex-col justify-start gap-1 bg-transparent"
			>
				<Tabs.Trigger
					value="settings"
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
				>
					<Palette />
				</Tabs.Trigger>
				<Tabs.Trigger
					value="components"
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
				>
					<Component />
				</Tabs.Trigger>
				<Tabs.Trigger
					value="layers"
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
				>
					<Layers />
				</Tabs.Trigger>
				<Tabs.Trigger
					value="data"
					class="h-10 w-10 p-0 data-[state=active]:bg-muted"
					disabled
				>
					<Database />
				</Tabs.Trigger>
			</Tabs.List>
		</div>
	</div>
</Tabs.Root>
