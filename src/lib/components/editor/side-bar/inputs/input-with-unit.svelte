<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";

	const {
		id,
		value,
		unit,
		type,
		placeholder,
		handleCustomChange,
	}: {
		id: string;
		unit: string;
		value?: string | number;
		type?: string;
		placeholder?: string;
		handleCustomChange: (style: string, value: string) => void;
	} = $props();
</script>

<div class="flex">
	<Input
		{id}
		value={value?.toString().replace(unit, "")}
		{placeholder}
		type={type ?? "text"}
		class="h-8 rounded-none !border-l-0 !border-r-0 px-1 pr-2 focus-visible:ring-offset-0"
		onchange={(event: Event) => {
			if (!(event.target instanceof HTMLInputElement)) {
				return;
			}
			handleCustomChange(id, `${event.target.value}px`);
		}}
	/>
	<div
		class="flex items-center justify-center rounded-r-md border border-l-0 border-muted px-2"
	>
		{unit}
	</div>
</div>
