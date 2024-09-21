<script lang="ts">
	import { type EditorElement } from "../types";
	import Recursive from "./recursive.svelte";

	const { element }: { element: EditorElement } = $props();
</script>

{#if Array.isArray(element.content)}
	{#each element.content as child (child.id)}
		<Recursive element={child} />
	{/each}
{/if}
