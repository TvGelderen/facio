<script lang="ts">
	import { pricingPlans } from "$lib/pricing";
	import * as Card from "$lib/components/ui/card/index.js";
	import Check from "lucide-svelte/icons/check";
</script>

<section>
	<div
		class="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent"
	>
		<p class="mt-8 text-center text-muted-foreground">
			Creating a website has never been this simple
		</p>
		<h1
			class="text-center text-7xl font-bold leading-snug md:text-9xl xl:text-[240px]"
		>
			Pagegen
		</h1>
		<div class="relative flex w-full items-center justify-center">
			<div
				class="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-background"
			></div>
			<enhanced:img
				src="/static/img/hero_image_tmp.png"
				alt="Dashboard preview image"
				class="mx-auto mt-[-12px] w-[90%] max-w-[1200px] rounded-t-2xl border-2 border-muted md:mt-0"
			/>
		</div>
	</div>
</section>
<section
	class="mt-12 flex flex-col items-center justify-center gap-4 pb-32 md:mt-20"
>
	<h2 class="text-center text-2xl md:text-4xl">Choose what you need</h2>
	<p class="text-center text-muted-foreground">
		Pagegen's pricing plans a made to fit your needs.
		<br />
		Not sure yet? Get started for free in just a few clicks.
	</p>
	<div class="mt-6 flex flex-wrap items-center justify-center gap-4">
		{#each pricingPlans as plan (plan.title)}
			<Card.Root
				class={`flex h-[320px] w-[260px] max-w-full flex-col md:h-[360px] md:w-[300px] ${plan.id === "pro" && "border-2 border-primary/25 shadow-lg shadow-primary/25"}`}
			>
				<Card.Header>
					<Card.Title
						class={`${plan.id !== "pro" && "text-muted-foreground"} md:text-lg`}
					>
						{plan.title}
					</Card.Title>
					<Card.Description>{plan.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<span class="text-3xl font-bold md:text-4xl">
						{plan.price}
					</span>
					{#if plan.interval !== ""}
						<span class="text-muted-foreground">
							/ {plan.interval}
						</span>
					{/if}
				</Card.Content>
				<Card.Footer
					class="flex w-full flex-1 flex-col items-start justify-between"
				>
					<div class="flex flex-col gap-2">
						{#each plan.features as feature}
							<div class="flex gap-2 text-muted-foreground">
								<Check />
								<span>{feature}</span>
							</div>
						{/each}
					</div>
					<a
						href={`/purchase?plan=${plan.id}`}
						class={`w-full rounded-md bg-primary py-2 text-center hover:bg-primary/75 ${plan.id !== "pro" && "!bg-muted-foreground/25 dark:!bg-muted-foreground/50 dark:hover:!bg-muted-foreground/75"} transition-colors`}
					>
						Get Started
					</a>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
