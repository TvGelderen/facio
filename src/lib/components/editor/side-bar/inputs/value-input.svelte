<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";

	const {
		label,
		id,
		value,
		type,
		placeholder,
		className,
		unit,
		handleChange,
	}: {
		label: string;
		id: string;
		value: string | number | undefined;
		type?: string;
		placeholder?: string;
		className?: string;
		unit?: string;
		handleChange: (event: Event) => void;
	} = $props();
</script>

<div class={className ? className : "grid grid-cols-3 items-center"}>
	<Label for={id}>{label}</Label>
	<div class="col-span-2 flex">
		<Input
			{id}
			{value}
			{placeholder}
			type={type ?? "text"}
			class={`h-8 px-2 py-0 focus-visible:ring-offset-0 ${unit && "!rounded-r-none !border-r-0"}`}
			onchange={handleChange}
		/>
		{#if unit}
			<div
				class="flex items-center justify-center rounded-r-md border border-l-0 border-muted px-2"
			>
				{unit}
			</div>
		{/if}
	</div>
</div>
