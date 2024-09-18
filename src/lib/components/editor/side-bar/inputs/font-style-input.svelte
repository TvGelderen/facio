<script lang="ts">
	import { Toggle } from "$lib/components/ui/toggle/index.js";
	import { Bold, Italic, Underline } from "lucide-svelte";

	const {
		handleCustomChange,
	}: {
		handleCustomChange: (style: string, value: string) => void;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-evenly">
		<Toggle
			aria-label="toggle-bold"
			size="sm"
			variant="outline"
			class="h-10 w-10"
			onPressedChange={(value: boolean) =>
				handleCustomChange("font-weight", value ? "800" : "400")}
		>
			<Bold />
		</Toggle>
		<Toggle
			aria-label="toggle-italic"
			size="sm"
			variant="outline"
			class="h-10 w-10"
			onPressedChange={(value: boolean) =>
				handleCustomChange("font-style", value ? "italic" : "normal")}
		>
			<Italic />
		</Toggle>
		<Toggle
			aria-label="toggle-underline"
			size="sm"
			variant="outline"
			class="h-10 w-10"
			onPressedChange={(value: boolean) =>
				handleCustomChange(
					"text-decoration",
					value ? "underline" : "none",
				)}
		>
			<Underline />
		</Toggle>
	</div>
</div>
