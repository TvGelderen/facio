<script lang="ts">
	import { Type } from "lucide-svelte";

	function ondragstart(event: DragEvent) {
		if (
			!(event.target instanceof HTMLElement) ||
			event.dataTransfer === null
		) {
			return;
		}

		event.dataTransfer?.setData("component-type", event.target.id);
	}
</script>

<h2 class="text-lg lg:text-xl">Components</h2>

<div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		id="text"
		draggable="true"
		{ondragstart}
		class="flex h-10 w-10 items-center justify-center rounded-md bg-muted"
	>
		<Type />
	</div>
</div>
