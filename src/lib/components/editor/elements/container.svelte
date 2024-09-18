<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Trash } from "lucide-svelte";
	import { getEditorState } from "../editor-context.svelte";
	import {
		EditorActionType,
		ElementType,
		type EditorElement,
	} from "../types";
	import {
		handleDeleteElement,
		handleSelectElement,
		newContainerElement,
		newLinkElement,
		newTextElement,
	} from "./functions";
	import Recursive from "./recursive.svelte";

	const { element }: { element: EditorElement } = $props();

	let ref = $state<HTMLElement | null>(null);

	const editor = getEditorState();

	const select = (event: Event) =>
		handleSelectElement(event, editor.handleAction, element);

	function handleDrop(event: DragEvent) {
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

	function handleDragStart(event: DragEvent) {
		if (element.type === ElementType.Body || event.dataTransfer === null) {
			return;
		}
		event.dataTransfer.setData("component-type", element.type);
	}

	function handleDragOver(event: Event) {
		event.preventDefault();
	}

	$effect(() => {
		console.log("style change");
		if (ref) {
			Object.assign(ref.style, element.styles);
		}
	});
</script>

<div
	id={element.id}
	class={`relative m-[5px] w-full p-[2px] text-[16px] ${
		!editor.live
			? editor.selectedElement?.id === element.id
				? element.type === ElementType.Body
					? "boder-red-500 border"
					: "border border-primary"
				: "border border-dashed border-slate-300"
			: ""
	} ${element.type === ElementType.Body && "h-full"} ${element.type === ElementType.Container && "h-fit"}`}
	draggable={element.type !== ElementType.Body}
	ondrop={handleDrop}
	ondragstart={handleDragStart}
	ondragover={handleDragOver}
	onclick={select}
	onkeypress={select}
	role="button"
	tabindex="0"
	bind:this={ref}
>
	{#if !editor.live && editor.selectedElement?.id === element.id}
		<div class="absolute left-[-1px] top-[-23px] rounded-t-md bg-primary">
			{editor.selectedElement.name}
		</div>
		<Button
			variant="destructive"
			class="absolute right-[-1px] top-[-23px] h-8 w-8 rounded-t-md bg-primary"
			onclick={() => handleDeleteElement(editor.handleAction, element)}
		>
			<Trash />
		</Button>
	{/if}

	{#if Array.isArray(element.content)}
		{#each element.content as child (child.id)}
			<Recursive element={child} />
		{/each}
	{/if}
</div>
