<script lang="ts">
	import { BadgePercent, Copy } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { offers } from '#lib/data/site.ts';

	let copied = $state('');
	function copy(code: string) {
		navigator.clipboard?.writeText(code).catch(() => {});
		copied = code;
		window.setTimeout(() => (copied = ''), 1500);
	}
</script>

<Seo
	title="Offers — SpiceRoute Restaurant & Bistro"
	description="Current offers at SpiceRoute, Bandra West: weekday lunch ₹100 off (LUNCH299), Family Feast 20% off (FEAST20), dessert on us (SWEET999) and a birthday lava cake (BDAYCAKE)."
	path="/offers"
	image="tandoori-platter"
/>

<PageHero eyebrow="Offers" title="Eat Well," script="Spend Less" desc="Current offers at SpiceRoute. Mention the code when you book, or apply it at checkout — one offer per visit." />

<section class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
	<div class="grid gap-5 sm:grid-cols-2">
		{#each offers as o}
			<article class="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-sm">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><BadgePercent size={24} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-2xl font-bold">{o.title}</h2>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{o.desc}</p>
				<div class="mt-5 flex items-center justify-between gap-3">
					<code class="rounded-xl border border-dashed border-gold bg-gold-pale px-4 py-2.5 font-bold tracking-widest text-cocoa">{o.code}</code>
					<button type="button" onclick={() => copy(o.code)} class="flex min-h-12 items-center gap-1.5 rounded-full border-2 border-cocoa px-4 text-sm font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">
						<Copy size={16} aria-hidden="true" /> {copied === o.code ? 'Copied ✓' : 'Copy code'}
					</button>
				</div>
				<p class="mt-3 text-xs text-muted">{o.valid}</p>
			</article>
		{/each}
	</div>
	<p class="mt-8 rounded-2xl bg-gold-pale px-5 py-4 text-center text-sm font-medium text-cocoa">
		Offers cannot be combined. Dine-in offers need a table booking; delivery offers apply on orders placed from this website.
	</p>
</section>
