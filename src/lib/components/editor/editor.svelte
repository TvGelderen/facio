<script lang="ts">
	import { EyeOff } from "lucide-svelte";
	import { getEditorState } from "./editor-context.svelte";
	import SideBar from "./side-bar/side-bar.svelte";
	import { Device, EditorActionType } from "./types";
	import Button from "../ui/button/button.svelte";

	const editor = getEditorState();

	function handleOusideClick() {
		editor.handleAction({
			type: EditorActionType.UpdateSelectedElement,
			element: null,
		});
	}
</script>

<section class="flex h-full w-full overflow-x-hidden">
	<div class="flex h-full w-full items-center justify-center">
		<div
			class={`use-automation-zoom-in h-full overflow-auto rounded-md bg-white transition-all duration-300 ${editor.device === Device.Mobile && "h-[720px] w-[375px]"} ${editor.device === Device.Tablet && "h-[1100px] w-[850px]"} ${editor.device === Device.Desktop && "w-full"}`}
			onclick={handleOusideClick}
			onkeypress={handleOusideClick}
			role="button"
			tabindex="0"
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
		</div>
	</div>

	<SideBar hidden={editor.live} />
</section>
