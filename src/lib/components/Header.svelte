<script lang="ts">
	import { Menu, Phone, Search, ShoppingBag, X } from '@lucide/svelte';
	import Logo from '#lib/components/Logo.svelte';
	import { navLinks, site } from '#lib/data/site.ts';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { page } from '$app/state';

	let menuOpen = $state(false);
	let searchOpen = $state(false);
	let query = $state('');

	function goSearch() {
		if (!query.trim()) return;
		window.location.href = `/menu?q=${encodeURIComponent(query.trim())}`;
	}
</script>

<header class="sticky top-0 z-50 bg-cocoa-deep/95 text-white shadow-lg backdrop-blur">
	<div class="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
		<Logo />

		<nav aria-label="Primary" class="hidden items-center gap-1 lg:flex">
			{#each navLinks as link}
				<a
					href={link.href}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
					class="rounded-full px-4 py-2.5 text-[0.95rem] font-medium text-white/85 transition-colors duration-200 hover:text-white {page.url.pathname === link.href
						? 'nav-active text-gold-soft'
						: ''}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-1 sm:gap-2">
			<button
				type="button"
				onclick={() => (searchOpen = !searchOpen)}
				aria-label="Search the menu"
				aria-expanded={searchOpen}
				class="hidden h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white min-[360px]:flex sm:h-12 sm:w-12"
			>
				<Search size={22} aria-hidden="true" />
			</button>
			<button
				type="button"
				onclick={() => (drawer.open = true)}
				aria-label="Open your order, {cart.count} item{cart.count === 1 ? '' : 's'}"
				class="relative flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white sm:h-12 sm:w-12"
			>
				<ShoppingBag size={22} aria-hidden="true" />
				{#if cart.count > 0}
					<span class="absolute top-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.7rem] font-bold text-cocoa-deep">
						{cart.count}
					</span>
				{/if}
			</button>
			<a
				href="/order"
				class="hidden min-h-12 items-center rounded-full bg-gold px-5 font-bold text-cocoa-deep shadow transition-transform duration-200 hover:scale-[1.03] md:flex"
			>
				Order Now
			</a>
			<a
				href={site.phoneHref}
				aria-label="Call SpiceRoute"
				class="hidden h-12 w-12 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white xl:flex"
			>
				<Phone size={22} aria-hidden="true" />
			</a>
			<button
				type="button"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				class="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 sm:h-12 sm:w-12 lg:hidden"
			>
				{#if menuOpen}<X size={24} aria-hidden="true" />{:else}<Menu size={24} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	{#if searchOpen}
		<div class="border-t border-white/10 px-4 py-3 sm:px-6">
			<form
				role="search"
				class="mx-auto flex max-w-xl gap-2"
				onsubmit={(e) => {
					e.preventDefault();
					goSearch();
				}}
			>
				<label for="header-search" class="sr-only">Search dishes</label>
				<input
					id="header-search"
					type="search"
					bind:value={query}
					placeholder="Search biryani, pasta, lava cake…"
					class="min-h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/60 focus:border-gold focus:outline-none"
				/>
				<button type="submit" class="min-h-12 rounded-full bg-gold px-5 font-bold text-cocoa-deep">Search</button>
			</form>
		</div>
	{/if}

	{#if menuOpen}
		<nav aria-label="Mobile" class="border-t border-white/10 px-4 pt-2 pb-4 lg:hidden">
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={() => (menuOpen = false)}
					class="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 {page.url.pathname ===
					link.href
						? 'text-gold-soft'
						: ''}"
				>
					{link.label}
				</a>
			{/each}
			<div class="mt-2 flex gap-2">
				<a href="/reservations" class="flex min-h-12 flex-1 items-center justify-center rounded-full border border-gold/60 font-bold text-gold-soft">Book a Table</a>
				<a href="/order" class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Order Now</a>
			</div>
		</nav>
	{/if}
</header>
