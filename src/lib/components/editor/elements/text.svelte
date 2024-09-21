<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Trash } from "lucide-svelte";
	import { getEditorState } from "../editor-context.svelte";
	import { EditorActionType, type EditorElement } from "../types";
	import { handleDeleteElement, handleSelectElement } from "./functions";

	const { element }: { element: EditorElement } = $props();

	let ref = $state<HTMLElement | null>(null);

	const editor = getEditorState();

	function onblur(event: Event) {
		if (!event.target || !(event.target instanceof HTMLSpanElement)) {
			return;
		}

		editor.handleAction({
			type: EditorActionType.UpdateElement,
			element: {
				...element,
				content: {
					innerText: event.target.innerText,
				},
			},
		});
	}

	function onkeypress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	}

	function ondragstart(event: DragEvent) {
		if (ref !== null) {
			editor.handleDragStart(event, element, ref);
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
	class={`relative h-fit w-full p-1 leading-none ${
		!editor.live
			? editor.selectedElement?.id === element.id
				? "border-2 border-primary"
				: "border-2 border-dashed border-muted-foreground"
			: ""
	}`}
	onclick={select}
	onkeypress={select}
	role="button"
	tabindex="0"
	bind:this={ref}
	draggable="true"
	{ondragstart}
>
	{#if !editor.live && editor.selectedElement?.id === element.id}
		<div
			class="absolute left-[-2px] top-[-24px] bg-primary px-[4px] py-[2px] text-sm text-white"
		>
			{editor.selectedElement.name}
		</div>
		<Button
			variant="destructive"
			class="absolute right-[-2px] top-[-24px] h-6 w-6 rounded-none p-0"
			onclick={() => handleDeleteElement(editor.handleAction, element)}
		>
			<Trash class="h-4 w-4 text-white" />
		</Button>
	{/if}

	<span
		contenteditable={!editor.live}
		{onblur}
		{onkeypress}
		role="form"
		class="w-full focus-visible:outline-none"
	>
		{#if !Array.isArray(element.content) && element.content.innerText}
			{element.content.innerText}
		{/if}
	</span>
</div>
