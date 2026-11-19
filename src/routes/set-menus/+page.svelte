<script lang="ts">
	import { ArrowRight, Leaf, UtensilsCrossed } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { inr, setMenus } from '#lib/data/site.ts';
</script>

<Seo
	title="Set Menus & Chef's Tasting — SpiceRoute Restaurant & Bistro"
	description="Chef's tasting menus at SpiceRoute, Bandra West: a five-course SpiceRoute Tasting (₹2,499), a veg Garden Tasting (₹1,999), the weekday lunch thali (₹299) and the Sunday family set menu."
	path="/set-menus"
	image="tasting-menu"
/>

<PageHero eyebrow="Set Menus" title="Let the Chef" script="Decide for You" desc="Five courses from three kitchens, or one generous thali — the set menus are how our chefs like to feed you." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-2">
		{#each setMenus as menu, i}
			<article class="flex flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm {i === 0 ? 'ring-2 ring-gold' : ''}">
				{#if i === 0}
					<Picture name="tasting-menu" alt="Fine-dining tasting course at SpiceRoute" width={1920} height={1280} sizes="(min-width: 1024px) 50vw, 100vw" imgClass="aspect-[16/9] w-full object-cover" />
				{/if}
				<div class="flex flex-1 flex-col p-6 sm:p-8">
					<div class="flex flex-wrap items-center gap-2">
						{#if menu.veg}<span class="inline-flex items-center gap-1.5 rounded-full border border-green-700 px-3 py-1 text-xs font-bold text-green-800"><Leaf size={13} aria-hidden="true" /> Vegetarian</span>{/if}
						{#if i === 0}<span class="rounded-full bg-gold px-3 py-1 text-xs font-bold text-cocoa-deep">Chef’s Signature</span>{/if}
						<span class="text-sm font-semibold text-muted">{menu.serves}</span>
					</div>
					<h2 class="mt-3 font-display text-2xl font-bold">{menu.name}</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{menu.desc}</p>
					<ol class="mt-4 space-y-2">
						{#each menu.courses as course, j}
							<li class="flex gap-3 text-sm"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-pale text-xs font-bold text-cocoa">{j + 1}</span><span class="font-medium">{course}</span></li>
						{/each}
					</ol>
					<div class="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-5">
						<p><span class="font-display text-3xl font-bold text-maroon">{inr(menu.price)}</span><span class="text-sm text-muted"> per person</span></p>
						<a href="/reservations" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.02]">
							Book This Menu <ArrowRight size={18} aria-hidden="true" />
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-12 max-w-3xl rounded-[2rem] bg-cocoa-deep p-8 text-center text-white sm:p-10">
		<p class="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.28em] text-gold-soft uppercase"><UtensilsCrossed size={16} aria-hidden="true" /> Good to know</p>
		<p class="mx-auto mt-3 max-w-xl text-white/75">Tasting menus are served for the whole table, and need a reservation — mention the menu name in your booking notes. Jain and allergy-adapted tastings are available with 24 hours’ notice. Wine pairings are available on request; we are happy to pair mocktails instead.</p>
		<a href="/allergens" class="mt-5 inline-flex min-h-12 items-center rounded-full border-2 border-white/50 px-7 font-bold text-white">Read the Allergen Guide</a>
	</div>
</section>
