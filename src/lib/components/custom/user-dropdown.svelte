<script lang="ts">
	import User from "lucide-svelte/icons/user";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import LayoutDashboard from "lucide-svelte/icons/layout-dashboard";
	import LogOut from "lucide-svelte/icons/log-out";
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
				<CreditCard class="mr-2 h-4 w-4" />
				<span>Subscription</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<LayoutDashboard class="mr-2 h-4 w-4" />
				<span>Dashboard</span>
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
