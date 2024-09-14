<script lang="ts">
	import { User, CreditCard, LayoutDashboard, LogOut } from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	const { avatar }: { avatar: string | null } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Image src={avatar} alt="user avatar" />
			<Avatar.Fallback><User /></Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<a href="/profile" class="flex items-center">
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<a href="/dashboard" class="flex items-center">
					<LayoutDashboard class="mr-2 h-4 w-4" />
					<span>Dashboard</span>
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Item disabled>
				<CreditCard class="mr-2 h-4 w-4" />
				<span>Subscription</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<a href="/auth/logout" class="flex items-center">
					<LogOut class="mr-2 h-4 w-4" />
					<span>Log out</span>
				</a>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
