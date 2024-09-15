<script lang="ts">
	import { ElementType, type EditorElement } from "./types";

	const { element }: { element: EditorElement } = $props();
</script>

{#if element.type === ElementType.Body}
	<body></body>
{:else if element.type === ElementType.Section}
	<div></div>
{:else if element.type === ElementType.Container}
	<div></div>
{:else if element.type === ElementType.Text}
	<p>Text</p>
{:else if element.type === ElementType.Link}
	<a href="/">Link</a>
{:else if element.type === ElementType.Image}
	<img src="/" alt="Custom" />
{/if}
