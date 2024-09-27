<script lang="ts">
	import { getEditorState } from "../editor-context.svelte";
	import { EditorActionType, type EditorElement } from "../types";

	const { element }: { element: EditorElement } = $props();

	const editor = getEditorState();

	let edit = $state(false);
	let editable = $derived(edit && !editor.live);

	function onblur(event: Event) {
		edit = false;

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
</script>

<span
	contenteditable={editable}
	{onblur}
	{onkeypress}
	ondblclick={() => (edit = true)}
	role="form"
	class="w-full focus-visible:outline-none"
>
	{#if !Array.isArray(element.content) && element.content.innerText}
		{element.content.innerText}
	{/if}
</span>
