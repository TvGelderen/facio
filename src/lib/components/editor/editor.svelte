<script lang="ts">
	import { EyeOff } from "lucide-svelte";
	import { getEditorState } from "./editor-context.svelte";
	import SideBar from "./side-bar/side-bar.svelte";
	import { Device } from "./types";
	import Button from "../ui/button/button.svelte";
	import Recursive from "./elements/recursive.svelte";

	const editor = getEditorState();
</script>

<section class="flex h-full w-full overflow-x-hidden">
	<div class="flex h-full w-full items-center justify-center">
		<div
			id="editor"
			class={`use-automation-zoom-in overflow-auto transition-all duration-300 ${editor.live && "!m-0 !h-dvh !w-dvw !p-0"} ${editor.device === Device.Mobile && "h-[720px] w-[375px]"} ${editor.device === Device.Tablet && "h-[1100px] w-[850px]"} ${editor.device === Device.Desktop && "h-full w-full p-8"}`}
		>
			{#if editor.preview}
				<Button
					variant="secondary"
					onclick={editor.toggleView}
					class="icon absolute right-4 top-4 z-50 h-8 w-8 p-1 opacity-50 hover:bg-muted hover:opacity-100"
				>
					<EyeOff />
				</Button>
			{/if}
			{#key editor.undoIndex}
				<Recursive element={editor.elements[0]} />
			{/key}
		</div>
	</div>

	<SideBar hidden={editor.live} />
</section>
