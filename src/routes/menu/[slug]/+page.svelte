<script lang="ts">
	import { ArrowLeft, Check, Flame, Heart, Leaf, Plus, Share2, Wheat } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { favourites } from '#lib/favourites.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { dishes, inr, pairsWith, site } from '#lib/data/site.ts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const dish = $derived(data.dish);
	const related = $derived(data.related);
	const pairs = $derived(
		(pairsWith[dish.id] ?? [])
			.map((p) => ({ ...p, dish: dishes.find((d) => d.id === p.id)! }))
			.filter((p) => p.dish)
	);
	let added = $state(false);
	let shared = $state(false);
	let qty = $state(1);

	const spiceLabel = $derived(['No spice', 'Mild', 'Medium', 'Hot'][dish.spice]);

	function add() {
		for (let i = 0; i < qty; i++) addToOrder(dish.name, dish.price);
		added = true;
		window.setTimeout(() => {
			added = false;
			drawer.open = true;
		}, 500);
	}

	async function share() {
		const url = `${site.url}/menu/${dish.id}`;
		const text = `${dish.name} — ${inr(dish.price)} at SpiceRoute, Bandra West`;
		try {
			if (navigator.share) {
				await navigator.share({ title: dish.name, text, url });
				return;
			}
			throw new Error('no share api');
		} catch {
			try {
				await navigator.clipboard.writeText(url);
				shared = true;
				window.setTimeout(() => (shared = false), 2000);
			} catch {
				// Clipboard unavailable — nothing to do.
			}
		}
	}

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'MenuItem',
		name: dish.name,
		description: dish.desc,
		image: `${site.url}/images/${dish.image}-1200.jpg`,
		offers: {
			'@type': 'Offer',
			price: dish.price,
			priceCurrency: 'INR',
			availability: 'https://schema.org/InStock'
		},
		suitableForDiet: dish.veg ? 'https://schema.org/VegetarianDiet' : undefined
	});
</script>

<svelte:head>
	<title>{dish.name} — {inr(dish.price)} · SpiceRoute Restaurant &amp; Bistro</title>
	<meta name="description" content="{dish.name} — {dish.desc} Order online or dine in at SpiceRoute, Bandra West, Mumbai." />
	<link rel="canonical" href="{site.url}/menu/{dish.id}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{dish.name} — {inr(dish.price)} · SpiceRoute" />
	<meta property="og:description" content={dish.desc} />
	<meta property="og:url" content="{site.url}/menu/{dish.id}" />
	<meta property="og:image" content="{site.url}/images/{dish.image}-1200.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="{site.url}/images/{dish.image}-1200.jpg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<a href="/menu" class="inline-flex min-h-12 items-center gap-2 font-bold text-maroon transition-colors hover:text-cocoa">
		<ArrowLeft size={18} aria-hidden="true" /> Back to Menu
	</a>

	<div class="mt-6 grid gap-10 lg:grid-cols-2">
		<div>
			<Picture
				name={dish.image}
				alt={dish.alt}
				width={1920}
				height={1280}
				sizes="(min-width: 1024px) 50vw, 100vw"
				eager={true}
				imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl"
			/>
			<div class="mt-4 flex flex-wrap gap-2">
				<span class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold {dish.veg ? 'border-green-700 text-green-800' : 'border-red-700 text-red-800'}">
					<span class="h-2.5 w-2.5 rounded-full {dish.veg ? 'bg-green-700' : 'bg-red-700'}"></span>
					{dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
				</span>
				{#if dish.spice > 0}
					<span class="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-red-800">
						{#each Array(dish.spice) as _}<Flame size={14} fill="currentColor" aria-hidden="true" />{/each}
						{spiceLabel}
					</span>
				{:else}
					<span class="inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted">No spice</span>
				{/if}
				{#if dish.tag}<span class="rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-cocoa-deep">{dish.tag}</span>{/if}
			</div>
		</div>

		<div>
			<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">{dish.category}</p>
			<h1 class="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-bold">{dish.name}</h1>
			<div class="mt-3 flex flex-wrap items-center gap-3">
				<Stars rating={dish.rating} />
				<span class="font-semibold">{dish.rating}</span>
				<span class="text-muted">({dish.reviews} reviews)</span>
				<span class="text-muted">·</span>
				<span class="text-muted">{dish.serves}</span>
			</div>
			<p class="mt-4 text-lg leading-relaxed text-muted">{dish.desc}</p>
			<p class="mt-5 flex items-baseline gap-3">
				<span class="font-display text-4xl font-bold text-maroon">{inr(dish.price)}</span>
				{#if dish.mrp}<span class="text-lg text-muted line-through">{inr(dish.mrp)}</span>{/if}
			</p>

			<div class="mt-6 flex flex-wrap items-center gap-3">
				<div class="flex items-center gap-1 rounded-full border border-line bg-white" role="group" aria-label="Quantity">
					<button type="button" onclick={() => (qty = Math.max(1, qty - 1))} aria-label="Decrease quantity" class="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold hover:bg-cream-deep">−</button>
					<span class="w-8 text-center text-lg font-bold" aria-label="Quantity {qty}">{qty}</span>
					<button type="button" onclick={() => (qty = Math.min(9, qty + 1))} aria-label="Increase quantity" class="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold hover:bg-cream-deep">+</button>
				</div>
				<button type="button" onclick={add} class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.02]">
					<Plus size={18} aria-hidden="true" /> {added ? 'Added to Order ✓' : `Add ${qty > 1 ? `${qty} × ` : ''}· ${inr(dish.price * qty)}`}
				</button>
				<button
					type="button"
					onclick={() => favourites.toggle(dish.id)}
					aria-pressed={favourites.has(dish.id)}
					aria-label={favourites.has(dish.id) ? `Remove ${dish.name} from favourites` : `Save ${dish.name} to favourites`}
					class="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-200 {favourites.has(dish.id)
						? 'border-red-700 bg-red-50 text-red-700'
						: 'border-line bg-white text-muted hover:border-red-700 hover:text-red-700'}"
				>
					<Heart size={20} fill={favourites.has(dish.id) ? 'currentColor' : 'none'} aria-hidden="true" />
				</button>
				<button
					type="button"
					onclick={share}
					class="flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border-2 border-line bg-white px-4 font-bold text-muted transition-colors duration-200 hover:border-gold hover:text-cocoa"
				>
					<Share2 size={18} aria-hidden="true" /> {shared ? 'Link copied!' : 'Share'}
				</button>
			</div>

			<div class="mt-8 space-y-5">
				<div>
					<h2 class="flex items-center gap-2 font-display text-lg font-bold"><Leaf size={18} class="text-maroon" aria-hidden="true" /> Ingredients</h2>
					<ul class="mt-2 flex flex-wrap gap-2">
						{#each dish.ingredients as ing}<li class="rounded-full bg-cream-deep px-3 py-1.5 text-sm font-medium">{ing}</li>{/each}
					</ul>
				</div>
				<div>
					<h2 class="flex items-center gap-2 font-display text-lg font-bold"><Wheat size={18} class="text-maroon" aria-hidden="true" /> Allergens</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						{#if dish.allergens.length > 0}
							Contains: {dish.allergens.join(', ')}. Please tell our team about any allergy before ordering.
						{:else}
							No major allergens listed. Please tell our team about any allergy before ordering.
						{/if}
					</p>
				</div>
				<div class="rounded-2xl bg-gold-pale px-5 py-4">
					<h2 class="font-display text-lg font-bold">Nutrition note</h2>
					<p class="mt-1 text-sm leading-relaxed text-cocoa">{dish.nutrition} Values are approximate, per serving, and vary with preparation.</p>
				</div>
				<p class="flex items-start gap-2 text-sm text-muted">
					<Check size={16} class="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />
					Cooked fresh to order. Jain preparation available on request — mention it in your order notes.
				</p>
			</div>
		</div>
	</div>

	{#if pairs.length > 0}
		<section class="mt-16" aria-label="Pairs well with">
			<h2 class="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold">Pairs Well With</h2>
			<p class="mt-1 text-muted">Our kitchen’s suggestions for a complete meal.</p>
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each pairs as p (p.id)}
					<a href="/menu/{p.dish.id}" class="group flex min-w-0 items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
						<Picture name={p.dish.image} alt={p.dish.alt} width={800} height={533} sizes="120px" imgClass="h-20 w-20 shrink-0 rounded-2xl object-cover" />
						<span class="min-w-0">
							<span class="block truncate font-display text-lg font-bold group-hover:text-maroon">{p.dish.name}</span>
							<span class="mt-0.5 block text-sm text-muted">{p.why}</span>
							<span class="mt-1 block font-bold text-maroon">{inr(p.dish.price)}</span>
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if related.length > 0}
		<section class="mt-16" aria-label="Related dishes">
			<h2 class="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold">You May Also Like</h2>
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each related as d (d.id)}
					<DishCard dish={d} />
				{/each}
			</div>
		</section>
	{/if}
</section>
