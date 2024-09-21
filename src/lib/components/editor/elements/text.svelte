<script lang="ts">
	import { getEditorState } from "../editor-context.svelte";
	import { EditorActionType, type EditorElement } from "../types";

	const { element }: { element: EditorElement } = $props();

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
</script>

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
