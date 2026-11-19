<script lang="ts">
	import { Search, SlidersHorizontal } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { categories, dishes, type Category } from '#lib/data/site.ts';
	import { page } from '$app/state';

	let query = $state('');
	let category = $state<Category | 'All'>('All');
	let vegOnly = $state(false);
	let maxSpice = $state<0 | 1 | 2 | 3>(3);

	// Read ?q / ?category on the client only — searchParams are unavailable
	// during prerendering, so defaults render first and filters apply on mount.
	$effect(() => {
		const q = page.url.searchParams.get('q');
		if (q) query = q;
		const c = page.url.searchParams.get('category');
		if (c && (categories as string[]).includes(c)) category = c as Category;
	});

	const filtered = $derived(
		dishes.filter((d) => {
			if (category !== 'All' && d.category !== category) return false;
			if (vegOnly && !d.veg) return false;
			if (d.spice > maxSpice) return false;
			if (query.trim()) {
				const q = query.trim().toLowerCase();
				const hay = `${d.name} ${d.desc} ${d.category} ${d.ingredients.join(' ')}`.toLowerCase();
				if (!hay.includes(q)) return false;
			}
			return true;
		})
	);
</script>

<PageHero eyebrow="SpiceRoute Menu" title="Eat Your Way" script="Across the Route" desc="Indian classics, Continental comfort, Asian wok dishes, desserts and coolers — all in one place. Prices include GST where applicable." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<!-- Search + filters -->
	<div class="rounded-3xl border border-line bg-white p-5 shadow-sm">
		<div class="flex flex-col gap-4 lg:flex-row lg:items-center">
			<div class="relative flex-1">
				<Search size={20} class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
				<label for="menu-search" class="sr-only">Search dishes</label>
				<input
					id="menu-search"
					type="search"
					bind:value={query}
					placeholder="Search biryani, pasta, lava cake…"
					class="min-h-12 w-full rounded-full border border-line bg-cream py-3 pr-4 pl-12 focus:border-gold focus:outline-none"
				/>
			</div>
			<label class="flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-line px-5 font-semibold">
				<input type="checkbox" bind:checked={vegOnly} class="h-5 w-5 accent-green-700" />
				<span class="flex items-center gap-2"><span class="flex h-5 w-5 items-center justify-center rounded border-2 border-green-700"><span class="h-2.5 w-2.5 rounded-full bg-green-700"></span></span> Veg only</span>
			</label>
		</div>
		<div class="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
			<SlidersHorizontal size={18} class="text-muted" aria-hidden="true" />
			<button type="button" onclick={() => (category = 'All')} aria-pressed={category === 'All'} class="min-h-11 rounded-full px-4 text-sm font-bold transition-colors duration-200 {category === 'All' ? 'bg-cocoa text-white' : 'border border-line bg-cream hover:border-gold'}">All</button>
			{#each categories as c}
				<button type="button" onclick={() => (category = c)} aria-pressed={category === c} class="min-h-11 rounded-full px-4 text-sm font-bold transition-colors duration-200 {category === c ? 'bg-cocoa text-white' : 'border border-line bg-cream hover:border-gold'}">{c}</button>
			{/each}
		</div>
		<div class="mt-4 flex flex-wrap items-center gap-3">
			<span class="text-sm font-semibold text-muted">Max spice level:</span>
			<div class="flex flex-wrap gap-2" role="group" aria-label="Maximum spice level">
				{#each [{ level: 0, label: 'No spice' }, { level: 1, label: 'Mild' }, { level: 2, label: 'Medium' }, { level: 3, label: 'Hot' }] as s}
					<button
						type="button"
						onclick={() => (maxSpice = s.level as 0 | 1 | 2 | 3)}
						aria-pressed={maxSpice === s.level}
						class="flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-bold transition-colors duration-200 {maxSpice === s.level ? 'bg-maroon text-white' : 'border border-line bg-cream hover:border-gold'}"
					>
						{s.label}
					</button>
				{/each}
			</div>
			<span class="text-xs text-muted">Flame icons on each card show the dish's spice level.</span>
		</div>
	</div>

	<p class="mt-6 text-sm font-semibold text-muted" aria-live="polite">
		{filtered.length} dish{filtered.length === 1 ? '' : 'es'}
		{#if category !== 'All'}in {category}{/if}
		{#if vegOnly}· veg only{/if}
		{#if query.trim()}· matching “{query.trim()}”{/if}
	</p>

	{#if filtered.length === 0}
		<div class="mt-8 rounded-3xl border border-dashed border-line bg-white p-10 text-center">
			<p class="font-display text-2xl font-bold">No dishes match those filters</p>
			<p class="mt-2 text-muted">Try a different search, or clear the veg and spice filters.</p>
			<button type="button" onclick={() => { query = ''; category = 'All'; vegOnly = false; maxSpice = 3; }} class="mt-5 inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-cocoa-deep">Clear all filters</button>
		</div>
	{:else}
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as dish (dish.id)}
				<DishCard {dish} />
			{/each}
		</div>
	{/if}

	<p class="mt-10 rounded-2xl bg-gold-pale px-5 py-4 text-center text-sm font-medium text-cocoa">
		All prices in ₹. GST of 5% applies on food. Jain preparations available on request — mention it in your order notes.
	</p>
</section>
