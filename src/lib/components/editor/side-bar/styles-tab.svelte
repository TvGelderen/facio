<script lang="ts">
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import { getEditorState } from "../editor-context.svelte";
	import { EditorActionType, ElementType } from "../types";
	import ValueInput from "./inputs/value-input.svelte";
	import HorizontalAlignInput from "./inputs/horizontal-align-input.svelte";
	import VerticalAlignInput from "./inputs/vertical-align-input.svelte";
	import TextAlignInput from "./inputs/text-align-input.svelte";
	import FontStyleInput from "./inputs/font-style-input.svelte";
	import PaddingInput from "./inputs/padding-input.svelte";
	import InputWithUnit from "./inputs/input-with-unit.svelte";
	import Label from "$lib/components/ui/label/label.svelte";

	const editor = getEditorState();

	const displayOptions = [
		{ value: "block", label: "block" },
		{ value: "flex", label: "flex" },
		{ value: "grid", label: "grid" },
		{ value: "inline", label: "inline" },
		{ value: "none", label: "none" },
	];

	const flexDirectionOptions = [
		{ value: "row", label: "row" },
		{ value: "column", label: "column" },
		{ value: "row-reverse", label: "row-reverse" },
		{ value: "column-reverse", label: "column-reverse" },
	];

	const flexFlowOptions = [
		{ value: "nowrap", label: "nowrap" },
		{ value: "wrap", label: "wrap" },
		{ value: "wrap-reverse", label: "wrap-reverse" },
	];

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

		console.log(editor.selectedElement);

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

<h2 class="text-lg lg:text-xl">Styles</h2>

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
				<TextAlignInput
					value={editor.selectedElement?.styles.textAlign}
					{handleCustomChange}
				/>
				<FontStyleInput {handleCustomChange} />
				<InputWithUnit
					label="Font Size"
					id="font-size"
					value={editor.selectedElement?.styles.fontSize}
					type="number"
					placeholder="12"
					unit="px"
					{handleCustomChange}
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
					type="text"
					placeholder="auto"
					className="flex flex-col"
					{handleChange}
				/>
				<ValueInput
					label="Height"
					id="height"
					value={editor.selectedElement?.styles.height}
					type="text"
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
				type="text"
				placeholder="transparent"
				{handleChange}
			/>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="layout">
		<Accordion.Trigger class="!no-underline">Layout</Accordion.Trigger>
		<Accordion.Content class="p-1">
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-3 items-center">
					<Label>Display</Label>
					<Select.Root
						items={displayOptions}
						selected={displayOptions.find(
							(option) =>
								option.value ===
								editor.selectedElement?.styles.display?.toString(),
						)}
						onSelectedChange={(value) =>
							handleCustomChange("display", value?.value)}
					>
						<Select.Trigger
							class="col-span-2 h-8 px-2 py-0 focus-visible:ring-offset-0 "
						>
							<Select.Value placeholder="Select a value" />
						</Select.Trigger>
						<Select.Content>
							{#each displayOptions as option}
								<Select.Item
									value={option.value}
									label={option.label}
								>
									{option.label}
								</Select.Item>
							{/each}
						</Select.Content>
						<Select.Input name="favoriteFruit" />
					</Select.Root>
				</div>
				{#if editor.selectedElement?.styles.display === "flex"}
					<div class="grid grid-cols-3 items-center">
						<Label>Flex direction</Label>
						<Select.Root
							items={flexDirectionOptions}
							selected={flexDirectionOptions.find(
								(option) =>
									option.value ===
									editor.selectedElement?.styles.flexDirection?.toString(),
							)}
							onSelectedChange={(value) =>
								handleCustomChange(
									"flexDirection",
									value?.value,
								)}
						>
							<Select.Trigger
								class="col-span-2 h-8 px-2 py-0 focus-visible:ring-offset-0 "
							>
								<Select.Value placeholder="Select a value" />
							</Select.Trigger>
							<Select.Content>
								{#each flexDirectionOptions as option}
									<Select.Item
										value={option.value}
										label={option.label}
									>
										{option.label}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<div class="grid grid-cols-3 items-center">
						<Label>Flex flow</Label>
						<Select.Root
							items={flexFlowOptions}
							selected={flexFlowOptions.find(
								(option) =>
									option.value ===
									editor.selectedElement?.styles.flexFlow?.toString(),
							)}
							onSelectedChange={(value) =>
								handleCustomChange("flexFlow", value?.value)}
						>
							<Select.Trigger
								class="col-span-2 h-8 px-2 py-0 focus-visible:ring-offset-0 "
							>
								<Select.Value placeholder="Select a value" />
							</Select.Trigger>
							<Select.Content>
								{#each flexDirectionOptions as option}
									<Select.Item
										value={option.value}
										label={option.label}
									>
										{option.label}
									</Select.Item>
								{/each}
							</Select.Content>
							<Select.Input name="favoriteFruit" />
						</Select.Root>
					</div>
				{/if}

				{#if editor.selectedElement?.styles.display === "grid"}
					<div class="grid grid-cols-2 gap-4">
						<ValueInput
							label="Number of columns"
							id="gridTemplateColumns"
							value={editor.selectedElement?.styles.gridTemplateColumns
								?.toString()
								.replace("repeat(", "")
								.replace(", 1fr)", "")}
							type="text"
							className="grid-cols-1"
							handleCustomChange={(value) =>
								handleCustomChange(
									"gridTemplateColumns",
									`repeat(${value}, 1fr)`,
								)}
						/>
						<ValueInput
							label="Number of rows"
							id="gridTemplateRows"
							value={editor.selectedElement?.styles.gridTemplateRows
								?.toString()
								.replace("repeat(", "")
								.replace(", 1fr)", "")}
							type="text"
							className="grid-cols-1"
							handleCustomChange={(value) =>
								handleCustomChange(
									"gridTemplateRows",
									`repeat(${value}, 1fr)`,
								)}
						/>
					</div>
				{/if}

				{#if editor.selectedElement?.styles.display === "flex" || editor.selectedElement?.styles.display === "grid"}
					<div class="grid grid-cols-2 gap-4">
						<Tooltip.Root>
							<Tooltip.Trigger class="flex h-full items-center">
								<Label
									for="rowGap"
									class="flex h-full items-center rounded-l-md border !border-r-0 border-muted px-2"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-between-horizontal-start"
									>
										<rect
											width="13"
											height="7"
											x="8"
											y="3"
											rx="1"
										/>
										<path d="m2 9 3 3-3 3" />
										<rect
											width="13"
											height="7"
											x="8"
											y="14"
											rx="1"
										/>
									</svg>
								</Label>
								<InputWithUnit
									id="rowGap"
									value={editor.selectedElement.styles.rowGap}
									type="number"
									unit="px"
									placeholder="0"
									{handleCustomChange}
								/>
							</Tooltip.Trigger>
							<Tooltip.Content>Row Gap</Tooltip.Content>
						</Tooltip.Root>
						<Tooltip.Root>
							<Tooltip.Trigger class="flex h-full items-center">
								<Label
									for="columnGap"
									class="flex h-full items-center rounded-l-md border !border-r-0 border-muted px-2"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-between-vertical-start"
									>
										<rect
											width="7"
											height="13"
											x="3"
											y="8"
											rx="1"
										/>
										<path d="m15 2-3 3-3-3" />
										<rect
											width="7"
											height="13"
											x="14"
											y="8"
											rx="1"
										/>
									</svg>
								</Label>
								<InputWithUnit
									id="columnGap"
									value={editor.selectedElement.styles
										.columnGap}
									type="number"
									unit="px"
									placeholder="0"
									{handleCustomChange}
								/>
							</Tooltip.Trigger>
							<Tooltip.Content>Column Gap</Tooltip.Content>
						</Tooltip.Root>
					</div>
					<HorizontalAlignInput
						value={editor.selectedElement?.styles.justifyContent}
						{handleCustomChange}
					/>
					<VerticalAlignInput
						value={editor.selectedElement?.styles.alignItems}
						{handleCustomChange}
					/>
				{/if}
			</div>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
