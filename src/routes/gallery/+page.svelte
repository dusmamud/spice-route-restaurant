<script lang="ts">
	import { ChevronLeft, ChevronRight, X } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { galleryItems } from '#lib/data/site.ts';

	const tags = ['All', ...new Set(galleryItems.map((g) => g.tag))];
	let active = $state('All');
	let lightbox = $state(-1);
	const filtered = $derived(active === 'All' ? galleryItems : galleryItems.filter((g) => g.tag === active));

	function open(i: number) {
		lightbox = i;
	}
	function close() {
		lightbox = -1;
	}
	function step(dir: 1 | -1) {
		if (lightbox < 0) return;
		lightbox = (lightbox + dir + filtered.length) % filtered.length;
	}

	$effect(() => {
		if (lightbox < 0) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') step(1);
			if (e.key === 'ArrowLeft') step(-1);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	});
</script>

<Seo
	title="Gallery — SpiceRoute Restaurant & Bistro"
	description="Inside SpiceRoute, Bandra West: the dining room, the tandoor, the desserts and the people. Photos from our kitchen and tables."
	path="/gallery"
	image="dining-room"
/>

<PageHero eyebrow="Gallery" title="Moments at" script="SpiceRoute" desc="From the tandoor to the table — a peek inside our kitchen, our dining room and our plates." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
		{#each tags as t}
			<button type="button" onclick={() => { active = t; lightbox = -1; }} aria-pressed={active === t} class="min-h-11 rounded-full px-5 text-sm font-bold transition-colors duration-200 {active === t ? 'bg-cocoa text-white' : 'border border-line bg-white hover:border-gold'}">{t}</button>
		{/each}
	</div>
	<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
		{#each filtered as g, i (g.image)}
			<button type="button" onclick={() => open(i)} aria-label="View photo: {g.caption}" class="group relative block overflow-hidden rounded-3xl text-left shadow-md">
				<Picture name={g.image} alt={g.alt} width={800} height={533} sizes="(min-width: 1024px) 25vw, 50vw" imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-deep/90 to-transparent px-4 pt-10 pb-4">
					<span class="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-cocoa-deep">{g.tag}</span>
					<span class="mt-1.5 block text-sm font-semibold text-white">{g.caption}</span>
				</span>
			</button>
		{/each}
	</div>
	<p class="mt-8 text-center text-sm text-muted">Photos are mock imagery for design review. Follow us on Instagram for the real thing — new dishes every week.</p>
</section>

{#if lightbox >= 0}
	<div class="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa-deep/90 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label="Photo viewer: {filtered[lightbox].caption}">
		<button type="button" aria-label="Close photo viewer" onclick={close} class="absolute inset-0 cursor-default"></button>
		<div class="relative w-full max-w-3xl">
			<Picture name={filtered[lightbox].image} alt={filtered[lightbox].alt} width={1600} height={1067} sizes="90vw" eager={true} imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-2xl" />
			<div class="mt-4 flex items-center justify-between gap-4 text-white">
				<span>
					<span class="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-cocoa-deep">{filtered[lightbox].tag}</span>
					<span class="mt-1.5 block font-semibold">{filtered[lightbox].caption}</span>
				</span>
				<span class="shrink-0 text-sm text-white/70">{lightbox + 1} / {filtered.length}</span>
			</div>
			<button type="button" onclick={close} aria-label="Close photo viewer" class="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-cocoa-deep shadow-lg"><X size={22} aria-hidden="true" /></button>
			<button type="button" onclick={() => step(-1)} aria-label="Previous photo" class="absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-cocoa-deep shadow-lg"><ChevronLeft size={24} aria-hidden="true" /></button>
			<button type="button" onclick={() => step(1)} aria-label="Next photo" class="absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-cocoa-deep shadow-lg"><ChevronRight size={24} aria-hidden="true" /></button>
		</div>
	</div>
{/if}
