<script lang="ts">
	import { AlertTriangle, Leaf, ShieldCheck, Wheat } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { dishes, jainFriendlyIds, site } from '#lib/data/site.ts';

	// Three-state allergen model: contains / may contain / removable.
	// We list what a dish CONTAINS; filtering excludes on any listed state.
	const allergenLabel = (a: string) => a;
</script>

<Seo
	title="Allergen & Dietary Guide — SpiceRoute Restaurant & Bistro"
	description="Every SpiceRoute dish, its allergens, and how we cook for veg, vegan, Jain and gluten-free guests. Our kitchen handles all major allergens — read before you order."
	path="/allergens"
	image="hero-biryani"
/>

<PageHero eyebrow="Eat Safely" title="Allergen &" script="Dietary Guide" desc="One in three guests has an allergy or a dietary need. Here is exactly what is in every dish — and how we cook around it." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-5 md:grid-cols-3">
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Wheat size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">How we label</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Every dish lists what it <strong>contains</strong>. Where a garnish can be left off — fried onions, nuts, cream — it is <strong>removable</strong> on request. If you filter out an allergen on the menu, we exclude the dish on any of these states.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><AlertTriangle size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Cross-contact</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Our kitchen handles wheat, nuts, dairy, egg, soy, sesame and mustard. We clean down between allergy orders, but we cannot guarantee zero cross-contact. If your allergy is severe, please call us before ordering.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Leaf size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Veg, vegan &amp; Jain</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Most Indian and Asian dishes have a veg version. Jain preparations (no onion, garlic or root vegetables) are available for the {jainFriendlyIds.length} dishes marked Jain-friendly — mention it in your order notes or at the table.</p>
		</div>
	</div>

	<h2 class="mt-14 flex items-center gap-3 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold"><ShieldCheck size={30} class="text-maroon" aria-hidden="true" /> Every Dish, Every Allergen</h2>
	<div class="mt-6 overflow-x-auto rounded-3xl border border-line bg-white shadow-sm">
		<table class="w-full min-w-[560px] text-left text-sm">
			<thead>
				<tr class="border-b border-line bg-cream-deep/60">
					<th scope="col" class="px-5 py-4 font-display text-base font-bold">Dish</th>
					<th scope="col" class="px-5 py-4 font-display text-base font-bold">Diet</th>
					<th scope="col" class="px-5 py-4 font-display text-base font-bold">Contains</th>
				</tr>
			</thead>
			<tbody>
				{#each dishes as d}
					<tr class="border-b border-line last:border-0">
						<td class="px-5 py-3.5 font-semibold"><a href="/menu/{d.id}" class="hover:text-maroon">{d.name}</a></td>
						<td class="px-5 py-3.5">
							<span class="inline-flex items-center gap-1.5 font-semibold {d.veg ? 'text-green-800' : 'text-red-800'}">
								<span class="h-2.5 w-2.5 rounded-full {d.veg ? 'bg-green-700' : 'bg-red-700'}"></span>
								{d.veg ? 'Veg' : 'Non-veg'}{jainFriendlyIds.includes(d.id) ? ' · Jain on request' : ''}
							</span>
						</td>
						<td class="px-5 py-3.5 text-muted">{d.allergens.length > 0 ? d.allergens.map(allergenLabel).join(', ') : 'No major allergens listed'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-4 text-sm text-muted">Values are for the standard recipe. Tell our team about any allergy before ordering — in the restaurant, at the table, or in your order notes online.</p>

	<div class="mt-10 rounded-[2rem] bg-cocoa-deep p-8 text-white sm:p-10">
		<h2 class="font-display text-2xl font-bold">Questions About an Allergy?</h2>
		<p class="mt-2 max-w-2xl text-white/75">Call us before you book or order and we’ll walk through the menu with you, dish by dish. No question is too small when it’s about your safety.</p>
		<div class="mt-5 flex flex-wrap gap-3">
			<a href={site.phoneHref} class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Call {site.phoneDisplay}</a>
			<a href="/menu" class="flex min-h-12 items-center rounded-full border-2 border-white/50 px-7 font-bold text-white">Back to the Menu</a>
		</div>
	</div>
</section>
