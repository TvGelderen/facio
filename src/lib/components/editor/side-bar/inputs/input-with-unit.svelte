<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";

	const {
		id,
		label,
		value,
		unit,
		type,
		placeholder,
		handleCustomChange,
	}: {
		id: string;
		unit: string;
		label?: string;
		value?: string | number;
		type?: string;
		placeholder?: string;
		handleCustomChange: (style: string, value: string) => void;
	} = $props();
</script>

<div class={label ? "grid grid-cols-3 items-center" : "flex"}>
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div class={`flex ${label && "col-span-2"}`}>
		<Input
			{id}
			value={value?.toString().replace(unit, "")}
			{placeholder}
			type={type ?? "text"}
			class={`h-8 !border-r-0 px-2 py-0 focus-visible:ring-offset-0 ${label ? "!rounded-r-none" : "rounded-none !border-l-0 px-1 pr-2"}`}
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
</div>
