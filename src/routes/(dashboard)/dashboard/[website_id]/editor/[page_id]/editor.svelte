<script lang="ts">
	import { getEditorState } from "./editor-context.svelte";
	import EditorSideBar from "./editor-side-bar.svelte";

	const editor = getEditorState();
</script>

<section class="flex h-full w-full">
	<div class="h-full w-full">
		<h1 class="text-xl">Editor</h1>
		<h2 class="text-lg">{editor.device}</h2>
		<h2 class="text-lg">{editor.preview}</h2>
	</div>

	<EditorSideBar />
</section>
