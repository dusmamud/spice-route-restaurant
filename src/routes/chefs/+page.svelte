<script lang="ts">
	import { ArrowRight, Quote } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { chefs, inr } from '#lib/data/site.ts';
</script>

<Seo
	title="Meet the Chefs — SpiceRoute Restaurant & Bistro"
	description="Meet the people behind the pass: Executive Chef Armaan Kapoor, Head of Patisserie Meera Nair and Head Tandoor Chef Rohit Shetty. Three kitchens, one table."
	path="/chefs"
	image="chef-portrait-armaan"
/>

<PageHero eyebrow="Our Chefs" title="Three Kitchens," script="One Table" desc="Tandoor, wok and patisserie — each run by someone who has spent a decade or more at their craft." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-3">
		{#each chefs as chef}
			<article class="flex flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm">
				<Picture name={chef.image} alt={chef.alt} width={1280} height={1600} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" imgClass="aspect-[4/5] w-full object-cover" />
				<div class="flex flex-1 flex-col p-6">
					<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">{chef.role}</p>
					<h2 class="mt-2 font-display text-2xl font-bold">{chef.name}</h2>
					<p class="mt-1 text-sm font-semibold text-muted">{chef.years}</p>
					<p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{chef.bio}</p>
					<blockquote class="mt-4 flex gap-2 rounded-2xl bg-gold-pale px-4 py-3 text-sm font-medium text-cocoa">
						<Quote size={16} class="mt-0.5 shrink-0 text-maroon" fill="currentColor" aria-hidden="true" />
						“{chef.quote}”
					</blockquote>
					<a href="/menu/{chef.signature}" class="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.02]">
						Order with {chef.name.split(' ')[0]} <ArrowRight size={18} aria-hidden="true" />
					</a>
				</div>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-14 max-w-3xl rounded-[2rem] bg-cocoa-deep p-8 text-center text-white sm:p-10">
		<p class="text-xs font-bold tracking-[0.28em] text-gold-soft uppercase">From the kitchen</p>
		<h2 class="mt-3 font-display text-[clamp(1.5rem,4vw,2rem)] font-bold">Want to Cook With Them?</h2>
		<p class="mx-auto mt-3 max-w-xl text-white/75">Chef Armaan runs a dum biryani masterclass once a month, and the tasting table twice a season. Twelve seats, aprons included, lunch at the end.</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a href="/events" class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">See Classes &amp; Events</a>
			<a href="/set-menus" class="flex min-h-12 items-center rounded-full border-2 border-white/50 px-7 font-bold text-white">The Tasting Menus</a>
		</div>
	</div>
</section>
