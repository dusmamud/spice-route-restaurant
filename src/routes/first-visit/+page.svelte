<script lang="ts">
	import { ArrowRight, Baby, Car, Clock, Shirt, Star, UtensilsCrossed } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { dishes, site } from '#lib/data/site.ts';

	const mustTry = ['hyderabadi-chicken-biryani', 'butter-chicken', 'hakka-noodles', 'chocolate-lava-cake']
		.map((id) => dishes.find((d) => d.id === id)!)
		.filter(Boolean);
</script>

<Seo
	title="First Visit Guide — SpiceRoute Restaurant & Bistro"
	description="Visiting SpiceRoute for the first time? What to expect, when to come, what to order, parking, dress code and kids — everything a first-time guest needs."
	path="/first-visit"
	image="dining-room"
/>

<PageHero eyebrow="First Visit" title="Your First Time" script="at SpiceRoute" desc="Everything you need to know before your first biryani — no surprises, just a good evening." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Clock size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">When to come</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">We’re open 11:30 AM–3:30 PM for lunch and 7–11 PM for dinner, every day. Weekends fill up — book ahead. For the quietest tables, come for a weekday lunch or a 7 PM dinner slot. The kitchen pauses 3:30–7 PM between services.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><UtensilsCrossed size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">What to expect</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Candle-lit tables, brass and warm wood, and a room that hums without shouting. No cover charge, no minimum spend. Walk-ins are welcome; a reservation just guarantees your table within 15 minutes of your slot.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Shirt size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Dress code</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Smart casual. Come as you are — most guests are in anything from kurtas to jeans. We only ask for shoes and a smile.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Car size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Getting here &amp; parking</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">We’re on Linking Road, Bandra West — 5 minutes from Bandra station. Valet parking runs 7–11 PM; otherwise, the Linking Road pay-and-park is a 2-minute walk. The building has lift access from street level.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Baby size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">With kids</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Children are very welcome. High chairs are available (pick it in the seating preference when you book), and the kitchen will happily make a mild, small-portion biryani or pasta for little ones.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Star size={24} class="text-maroon" fill="currentColor" aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">How to book</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Online in under a minute, or call {site.phoneDisplay}. No advance payment for tables up to 8. Tell us the occasion — birthdays get a lava cake on the house when you book 48 hours ahead.</p>
		</div>
	</div>

	<h2 class="mt-14 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">If You Order Only Four Things…</h2>
	<p class="mt-2 text-muted">The four plates our regulars would fight you for. Start here, then explore.</p>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each mustTry as dish}
			<DishCard {dish} />
		{/each}
	</div>

	<div class="mt-12 flex flex-wrap justify-center gap-3">
		<a href="/reservations" class="flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 font-bold text-cocoa-deep">Book Your First Table <ArrowRight size={18} aria-hidden="true" /></a>
		<a href="/menu" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-8 font-bold">Browse the Full Menu</a>
	</div>
</section>
