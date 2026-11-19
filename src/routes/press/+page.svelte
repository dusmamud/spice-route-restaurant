<script lang="ts">
	import { Award, Mail, Quote } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { awards, pressQuotes, site } from '#lib/data/site.ts';

	let kitNote = $state(false);
</script>

<Seo
	title="Press & Awards — SpiceRoute Restaurant & Bistro"
	description="What the press says about SpiceRoute, Bandra West — reviews, quotes and awards, plus press contacts and the media kit."
	path="/press"
	image="dining-room"
/>

<PageHero eyebrow="Press" title="What They" script="Say About Us" desc="We’d rather let the plates speak — but when the press does it for us, we keep the quotes." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-5 md:grid-cols-3">
		{#each pressQuotes as q}
			<figure class="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-sm">
				<Quote size={28} class="text-gold" fill="currentColor" aria-hidden="true" />
				<blockquote class="mt-3 flex-1 leading-relaxed">“{q.quote}”</blockquote>
				<figcaption class="mt-4">
					<span class="block font-bold">{q.source}</span>
					<span class="text-sm text-muted">{q.date}</span>
				</figcaption>
			</figure>
		{/each}
	</div>

	<h2 class="mt-14 flex items-center gap-3 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold"><Award size={30} class="text-maroon" aria-hidden="true" /> Awards</h2>
	<div class="mt-6 grid gap-5 sm:grid-cols-3">
		{#each awards as a}
			<div class="rounded-3xl border border-line bg-white p-6 text-center shadow-sm">
				<p class="font-display text-4xl font-bold text-gold">{a.year}</p>
				<p class="mt-2 font-display text-lg leading-snug font-bold">{a.title}</p>
				<p class="mt-1 text-sm text-muted">{a.org}</p>
			</div>
		{/each}
	</div>

	<div class="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
		<div class="rounded-3xl bg-cocoa-deep p-8 text-white">
			<h2 class="flex items-center gap-2 font-display text-2xl font-bold"><Mail size={22} class="text-gold-soft" aria-hidden="true" /> Press Enquiries</h2>
			<p class="mt-3 text-sm leading-relaxed text-white/75">For interviews, tastings, photography or review visits, write to our team. We reply within 2 working days.</p>
			<p class="mt-4 font-bold"><a href="mailto:{site.email}" class="text-gold-soft underline underline-offset-4">{site.email}</a></p>
			<p class="mt-1 text-sm text-white/75">{site.phoneDisplay} · {site.addressShort}</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-8 shadow-sm">
			<h2 class="font-display text-2xl font-bold">Media Kit</h2>
			<p class="mt-3 text-sm leading-relaxed text-muted">Logos, food photography, chef portraits and the fact sheet — everything a writer or producer needs, in one folder.</p>
			<button type="button" onclick={() => (kitNote = true)} class="mt-5 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Request the Media Kit</button>
			{#if kitNote}<p class="mt-3 text-sm font-semibold text-green-700" role="status">Request noted — in the live site, the kit would arrive by email within a day. (Mock button for design review.)</p>{/if}
		</div>
	</div>
</section>
