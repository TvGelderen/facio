<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Trash } from "lucide-svelte";
	import { getEditorState } from "../editor-context.svelte";
	import {
		EditorActionType,
		ElementType,
		type EditorElement,
	} from "../types";
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

	const select = (event: Event) =>
		handleSelectElement(event, editor.handleAction, element);

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
				? "rounded-md border border-primary"
				: "border border-dashed border-slate-300"
			: ""
	}`}
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

	<span contenteditable={!editor.live} {onblur}>
		{#if !Array.isArray(element.content) && element.content.innerText}
			{element.content.innerText}
		{/if}
	</span>
</div>
