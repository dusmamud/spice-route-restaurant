<script lang="ts">
	import { ArrowRight, CalendarDays, Clock, IndianRupee } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { events } from '#lib/data/site.ts';
</script>

<Seo
	title="Events & Live Music — SpiceRoute Restaurant & Bistro"
	description="Acoustic Fridays, dum biryani masterclasses, tasting tables and festive feasts at SpiceRoute, Bandra West. See what’s on and book your seat."
	path="/events"
	image="live-music"
/>

<PageHero eyebrow="Events" title="What’s On" script="at SpiceRoute" desc="Live music every Friday, a masterclass every month, and a tasting table twice a season — the room is always doing something." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-6 md:grid-cols-2">
		{#each events as e}
			<article class="flex flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm">
				<div class="relative">
					<Picture name={e.image} alt={e.title} width={1920} height={1280} sizes="(min-width: 1024px) 50vw, 100vw" imgClass="aspect-[16/9] w-full object-cover" />
					<span class="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-cocoa-deep">{e.tag}</span>
				</div>
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-2xl font-bold">{e.title}</h2>
					<p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{e.desc}</p>
					<ul class="mt-4 space-y-1.5 text-sm font-semibold">
						<li class="flex items-center gap-2"><CalendarDays size={16} class="text-maroon" aria-hidden="true" /> {e.date}</li>
						<li class="flex items-center gap-2"><Clock size={16} class="text-maroon" aria-hidden="true" /> {e.time}</li>
						<li class="flex items-center gap-2"><IndianRupee size={16} class="text-maroon" aria-hidden="true" /> {e.price}</li>
					</ul>
					<a href="/reservations" class="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.02]">
						Book a Seat <ArrowRight size={18} aria-hidden="true" />
					</a>
				</div>
			</article>
		{/each}
	</div>
	<div class="mx-auto mt-12 max-w-3xl rounded-[2rem] bg-gold-pale p-8 text-center">
		<h2 class="font-display text-2xl font-bold">Planning Something of Your Own?</h2>
		<p class="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-cocoa">Birthdays, launches, family gatherings — the private dining room seats 12, and our catering team covers up to 500 guests. Tell us the date and we’ll take it from there.</p>
		<div class="mt-5 flex flex-wrap justify-center gap-3">
			<a href="/private-dining" class="flex min-h-12 items-center rounded-full bg-cocoa px-7 font-bold text-white">Private Dining</a>
			<a href="/catering" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Catering Packages</a>
		</div>
	</div>
</section>
