<script lang="ts">
	import { Trash } from "lucide-svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { getEditorState } from "../editor-context.svelte";
	import {
		EditorActionType,
		ElementType,
		type EditorElement,
	} from "../types";
	import Container from "./container.svelte";
	import {
		handleDeleteElement,
		handleSelectElement,
		newContainerElement,
		newLinkElement,
		newTextElement,
	} from "./functions";
	import Text from "./text.svelte";

	const { element }: { element: EditorElement } = $props();
	const body = element.type === ElementType.Body;

	let ref = $state<HTMLElement | null>(null);

	const editor = getEditorState();

	function ondragstart(event: DragEvent) {
		if (ref !== null) {
			editor.handleDragStart(event, element, ref);
		}
	}

	function ondragover(event: DragEvent) {
		if (ref !== null) {
			editor.handleDragOver(event, element, ref);
		}
	}

	function ondrop(event: DragEvent) {
		if (editor.dragging) {
			editor.handleDrop(event, element);
			return;
		}

		event.stopPropagation();

		if (event.dataTransfer === null) {
			return;
		}

		const type = event.dataTransfer.getData(
			"component-type",
		) as ElementType;

		switch (type) {
			case ElementType.Text:
				editor.handleAction({
					type: EditorActionType.AddElement,
					parentId: element.id,
					element: newTextElement(element.id),
				});
				break;
			case ElementType.Link:
				editor.handleAction({
					type: EditorActionType.AddElement,
					parentId: element.id,
					element: newLinkElement(element.id),
				});
				break;
			case ElementType.Container:
				editor.handleAction({
					type: EditorActionType.AddElement,
					parentId: element.id,
					element: newContainerElement(element.id),
				});
				break;
			default:
				console.error("No valid component type found in event");
				break;
		}
	}

	const select = (event: Event) =>
		handleSelectElement(event, editor.handleAction, element);

	$effect(() => {
		if (ref) {
			Object.assign(ref.style, element.styles);
		}
	});
</script>

<div
	id={element.id}
	class={`relative z-10 text-[16px] ${
		!editor.live
			? editor.selectedElement?.id === element.id
				? body
					? "border-2 border-red-500/50"
					: "border-2 border-primary"
				: "border-2 border-dashed border-muted-foreground"
			: ""
	} ${body && "h-full"} ${!body && "h-fit"}`}
	draggable={!body}
	{ondrop}
	{ondragstart}
	{ondragover}
	onclick={select}
	onkeypress={select}
	role="button"
	tabindex="0"
	bind:this={ref}
>
	{#if !editor.live && editor.selectedElement?.id === element.id}
		<div
			class="absolute left-[-2px] top-[-24px] bg-primary px-[4px] py-[2px] text-sm"
		>
			{editor.selectedElement.name}
		</div>
		{#if !body}
			<Button
				variant="destructive"
				class="absolute right-[-2px] top-[-24px] h-6 w-6 rounded-none p-0"
				onclick={() =>
					handleDeleteElement(editor.handleAction, element)}
			>
				<Trash class="h-4 w-4 text-white" />
			</Button>
		{/if}
	{/if}

	{#if element.type === ElementType.Body}
		<Container {element} />
	{:else if element.type === ElementType.Container}
		<Container {element} />
	{:else if element.type === ElementType.Text}
		<Text {element} />
	{/if}
</div>
