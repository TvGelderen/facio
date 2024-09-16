<script lang="ts">
	import { getEditorState } from "./editor-context.svelte";

	const editor = getEditorState();
</script>

<div
	class="relative flex h-full w-[380px] items-start gap-4 border-l-2 border-l-muted"
>
	{#if editor.preview}
		<div class="absolute inset-0 bg-background/50"></div>
	{/if}
</div>
