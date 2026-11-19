<script lang="ts">
	import { Flame, Heart, Plus } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { favourites } from '#lib/favourites.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { inr, type Dish } from '#lib/data/site.ts';

	let { dish }: { dish: Dish } = $props();
	let added = $state(false);

	function add() {
		addToOrder(dish.name, dish.price);
		added = true;
		window.setTimeout(() => (added = false), 1200);
	}
</script>

<article class="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
	<a href="/menu/{dish.id}" class="relative block overflow-hidden" aria-label="{dish.name} — view details">
		<Picture
			name={dish.image}
			alt={dish.alt}
			width={800}
			height={533}
			sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
			imgClass="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
		<span class="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded border bg-white/95" aria-label={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}>
			<span class="h-2.5 w-2.5 rounded-full {dish.veg ? 'bg-green-700' : 'bg-red-700'}"></span>
		</span>
		{#if dish.tag}
			<span class="absolute top-3 right-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-cocoa-deep">{dish.tag}</span>
		{/if}
	</a>
	<div class="flex flex-1 flex-col p-5">
		<div class="flex items-start justify-between gap-3">
			<h3 class="font-display text-xl leading-snug font-bold">
				<a href="/menu/{dish.id}" class="transition-colors hover:text-maroon">{dish.name}</a>
			</h3>
			<p class="shrink-0 font-display text-xl font-bold text-maroon">{inr(dish.price)}</p>
		</div>
		<p class="mt-1 text-xs font-semibold tracking-wide text-muted uppercase">{dish.category} · {dish.serves}</p>
		<div class="mt-2 flex items-center gap-2">
			<Stars rating={dish.rating} />
			<span class="text-sm text-muted">{dish.rating} ({dish.reviews})</span>
			{#if dish.spice > 0}
				<span class="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-800" title="Spice level {dish.spice} of 3">
					{#each Array(dish.spice) as _}<Flame size={13} fill="currentColor" aria-hidden="true" />{/each}
					<span class="sr-only">Spice level {dish.spice} of 3</span>
				</span>
			{/if}
		</div>
		<p class="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{dish.desc}</p>
		<div class="mt-4 flex gap-2">
			<a href="/menu/{dish.id}" class="flex min-h-12 flex-1 items-center justify-center rounded-full border-2 border-cocoa text-sm font-bold text-cocoa transition-colors duration-200 hover:bg-cocoa hover:text-white">View Dish</a>
			<button
				type="button"
				onclick={add}
				class="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-gold text-sm font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.02]"
				aria-label="Add {dish.name} to order"
			>
				<Plus size={18} aria-hidden="true" />{added ? 'Added ✓' : 'Add'}
			</button>
			<button
				type="button"
				onclick={() => favourites.toggle(dish.id)}
				aria-pressed={favourites.has(dish.id)}
				aria-label={favourites.has(dish.id) ? `Remove ${dish.name} from favourites` : `Save ${dish.name} to favourites`}
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 {favourites.has(dish.id)
					? 'border-red-700 bg-red-50 text-red-700'
					: 'border-line text-muted hover:border-red-700 hover:text-red-700'}"
			>
				<Heart size={20} fill={favourites.has(dish.id) ? 'currentColor' : 'none'} aria-hidden="true" />
			</button>
		</div>
	</div>
</article>
