<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { galleryItems } from '#lib/data/site.ts';

	const tags = ['All', ...new Set(galleryItems.map((g) => g.tag))];
	let active = $state('All');
	const filtered = $derived(active === 'All' ? galleryItems : galleryItems.filter((g) => g.tag === active));
</script>

<PageHero eyebrow="Gallery" title="Moments at" script="SpiceRoute" desc="From the tandoor to the table — a peek inside our kitchen, our dining room and our plates." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
		{#each tags as t}
			<button type="button" onclick={() => (active = t)} aria-pressed={active === t} class="min-h-11 rounded-full px-5 text-sm font-bold transition-colors duration-200 {active === t ? 'bg-cocoa text-white' : 'border border-line bg-white hover:border-gold'}">{t}</button>
		{/each}
	</div>
	<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
		{#each filtered as g (g.image)}
			<figure class="group relative overflow-hidden rounded-3xl shadow-md">
				<Picture name={g.image} alt={g.alt} width={800} height={533} sizes="(min-width: 1024px) 25vw, 50vw" imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				<figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-deep/90 to-transparent px-4 pt-10 pb-4">
					<span class="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-cocoa-deep">{g.tag}</span>
					<span class="mt-1.5 block text-sm font-semibold text-white">{g.caption}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
	<p class="mt-8 text-center text-sm text-muted">Photos are mock imagery for design review. Follow us on Instagram for the real thing — new dishes every week.</p>
</section>
