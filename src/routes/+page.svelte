<script lang="ts">
	import { pricingPlans } from "$lib/pricing";
	import { Check } from "lucide-svelte";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<div
	class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f3e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
></div>
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
				alt="Dashboard preview"
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
					<Button
						href={`/purchase?plan=${plan.id}`}
						variant={plan.id === "pro" ? "default" : "secondary"}
						class="w-full"
					>
						Get Started
					</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>
