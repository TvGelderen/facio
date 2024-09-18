<script lang="ts">
	import { ElementType, type EditorElement } from "../types";
	import Container from "./container.svelte";
	import Text from "./text.svelte";

	const { element }: { element: EditorElement } = $props();
</script>

{#if element.type === ElementType.Body}
	<Container {element} />
{:else if element.type === ElementType.Section}
	<Container {element} />
{:else if element.type === ElementType.Container}
	<Container {element} />
{:else if element.type === ElementType.Text}
	<Text {element} />
{:else if element.type === ElementType.Link}
	<a href="/">Link</a>
{:else if element.type === ElementType.Image}
	<img src="/" alt="Custom" />
{/if}
