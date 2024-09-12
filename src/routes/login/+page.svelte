<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
</script>

<section class="mt-12 flex h-full w-full items-center justify-center">
	<Card.Root class="w-[95%] max-w-[400px]">
		<Card.Header>
			<Card.Title class="text-bold text-center text-xl">Login</Card.Title>
		</Card.Header>
		<Card.Content>
			<a href="/auth/provider/github" class="btn">
				<iconify-icon icon="mdi:github" class="text-3xl"></iconify-icon>
				Login with GitHub
			</a>
		</Card.Content>
	</Card.Root>
</section>
