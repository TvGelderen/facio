<script lang="ts">
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import { getEditorState } from "../editor-context.svelte";
	import { EditorActionType, ElementType } from "../types";
	import ValueInput from "./inputs/value-input.svelte";
	import HorizontalAlignInput from "./inputs/horizontal-align-input.svelte";
	import VerticalAlignInput from "./inputs/vertical-align-input.svelte";
	import TextAlignInput from "./inputs/text-align-input.svelte";
	import FontStyleInput from "./inputs/font-style-input.svelte";
	import PaddingInput from "./inputs/padding-input.svelte";

	const editor = getEditorState();

	function handleLinkChange() {
		console.log("handleLinkChange");
	}

	function handleChange(event: Event) {
		if (
			!event.target ||
			!(event.target instanceof HTMLInputElement) ||
			editor.selectedElement === null
		) {
			return;
		}

		handleCustomChange(event.target.id, event.target.value);
	}

	function handleCustomChange(style: string, value: string | undefined) {
		console.log(`handleCustomChange('${style}', '${value}')`);

		if (editor.selectedElement === null || !value) {
			return;
		}

		editor.selectedElement.styles = {
			...editor.selectedElement.styles,
			[style]: value,
		};

		editor.handleAction({
			type: EditorActionType.UpdateElement,
			element: editor.selectedElement,
		});
	}
</script>

<h2 class="text-lg lg:text-xl">Settings</h2>

<Accordion.Root
	multiple
	value={["typography", "dimensions", "styles", "layout"]}
	class="text-base"
>
	<Accordion.Item value="custom">
		<Accordion.Trigger class="!no-underline">Custom</Accordion.Trigger>
		<Accordion.Content class="p-1">
			{#if editor.selectedElement?.type === ElementType.Link && !Array.isArray(editor.selectedElement.content)}
				<div class="flex flex-col gap-2">
					<span class="text-muted-foreground">Link Path</span>
					<Input
						id="href"
						placeholder="www.domain.example.com/path"
						value={editor.selectedElement.content.href}
						onchange={handleLinkChange}
					/>
				</div>
			{:else}
				<span class="text-muted-foreground">
					No custom properties available for this element.
				</span>
			{/if}
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="typography">
		<Accordion.Trigger class="!no-underline">Typography</Accordion.Trigger>
		<Accordion.Content class="p-1">
			<div class="flex flex-col gap-4">
				<ValueInput
					label="Font Family"
					id="font-family"
					value={editor.selectedElement?.styles.fontFamily}
					{handleChange}
				/>
				<ValueInput
					label="Color"
					id="color"
					value={editor.selectedElement?.styles.color}
					{handleChange}
				/>
				<TextAlignInput {handleCustomChange} />
				<FontStyleInput {handleCustomChange} />
				<ValueInput
					label="Font Size"
					id="font-size"
					value={editor.selectedElement?.styles.fontSize}
					type="number"
					placeholder="12"
					unit="px"
					handleChange={(event: Event) => {
						if (!(event.target instanceof HTMLInputElement)) {
							return;
						}
						handleCustomChange(
							"font-size",
							`${event.target.value}px`,
						);
					}}
				/>
			</div>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="dimensions">
		<Accordion.Trigger class="!no-underline">Dimensions</Accordion.Trigger>
		<Accordion.Content class="p-1">
			<div class="grid grid-cols-2 gap-4">
				<ValueInput
					label="Width"
					id="width"
					value={editor.selectedElement?.styles.width}
					type="string"
					placeholder="auto"
					className="flex flex-col"
					{handleChange}
				/>
				<ValueInput
					label="Height"
					id="height"
					value={editor.selectedElement?.styles.width}
					type="string"
					placeholder="auto"
					className="flex flex-col"
					{handleChange}
				/>
				<PaddingInput
					styles={editor.selectedElement?.styles}
					{handleCustomChange}
				/>
			</div>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="styles">
		<Accordion.Trigger class="!no-underline">Styles</Accordion.Trigger>
		<Accordion.Content class="p-1">
			<ValueInput
				label="Background"
				id="background"
				value={editor.selectedElement?.styles.background}
				type="string"
				placeholder="transparent"
				{handleChange}
			/>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="layout">
		<Accordion.Trigger class="!no-underline">Layout</Accordion.Trigger>
		<Accordion.Content class="p-1">
			<div class="flex flex-col gap-4">
				<HorizontalAlignInput {handleCustomChange} />
				<VerticalAlignInput {handleCustomChange} />
			</div>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
