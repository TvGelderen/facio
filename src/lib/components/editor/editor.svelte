<script lang="ts">
	import { getEditorState } from "./editor-context.svelte";
	import SideBar from "./side-bar/side-bar.svelte";
	import { Device, EditorActionType } from "./types";

	const editor = getEditorState();

	function handleOusideClick() {
		editor.handleAction({
			type: EditorActionType.UpdateSelectedElement,
			element: null,
		});
	}
</script>

<section class="flex h-full w-full">
	<div class="flex h-full w-full items-center justify-center">
		<div
			class={`use-automation-zoom-in h-full overflow-auto rounded-md bg-background transition-all ${editor.preview && editor.live && "m-0 p-0"} ${editor.device === Device.Mobile && "w-[375px]"} ${editor.device === Device.Tablet && "w-[800px]"} ${editor.device === Device.Desktop && "w-full"}`}
		>
			<h2 class="text-lg">{editor.device}</h2>
			<h2 class="text-lg">{editor.preview}</h2>
		</div>
	</div>

	<SideBar />
</section>
