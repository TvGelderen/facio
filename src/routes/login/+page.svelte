<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Card from "$lib/components/ui/card/index.js";
</script>

<section class="mt-12 flex h-full w-full items-center justify-center">
	<Card.Root class="w-[95%] max-w-[400px]">
		<Card.Header>
			<Card.Title class="text-bold text-center text-xl">Login</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-4">
				<Button href="/auth/provider/github" class="w-full gap-2">
					<iconify-icon
						icon="mdi:github"
						class="text-2xl"
					></iconify-icon>
					Login with GitHub
				</Button>
				<Button class="w-full gap-2" disabled>
					<iconify-icon
						icon="mdi:google"
						class="text-2xl"
					></iconify-icon>
					Login with Google
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</section>
