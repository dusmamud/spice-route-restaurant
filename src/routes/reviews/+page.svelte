<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { testimonials } from '#lib/data/site.ts';

	const more = [
		{ name: 'Imran Qureshi', role: 'Bandra East', rating: 5, text: 'Ordered the tandoori platter for a house party — arrived hot, smoky, and gone in twenty minutes. The delivery packaging is excellent too.', dish: 'Tandoori Platter' },
		{ name: 'Meera Iyer', role: 'Khar', rating: 5, text: 'As a vegetarian, I never feel like an afterthought here. The paneer tikka and dal makhani are genuinely the best in the neighbourhood.', dish: 'Paneer Tikka' }
	];
	const all = [...testimonials, ...more];
	const avg = (all.reduce((a, t) => a + t.rating, 0) / all.length).toFixed(1);
</script>

<PageHero eyebrow="Reviews" title="What Mumbai" script="Says About Us" desc="Real words from regulars, first-timers and food lovers. {avg} out of 5 across {all.length * 214} guest reviews — these are a few favourites." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 text-center shadow-sm">
		<p class="font-display text-5xl font-bold text-maroon">{avg}</p>
		<div class="mt-2 flex justify-center"><Stars rating={4.8} size={22} /></div>
		<p class="mt-2 text-sm text-muted">Average rating · {all.length * 214} guest reviews (mock data for design review)</p>
	</div>
	<div class="mt-8 grid gap-5 md:grid-cols-2">
		{#each all as t}
			<figure class="rounded-3xl border border-line bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between gap-3">
					<Stars rating={t.rating} />
					<span class="rounded-full bg-cream-deep px-3 py-1 text-xs font-bold text-cocoa">{t.dish}</span>
				</div>
				<blockquote class="mt-3 leading-relaxed">“{t.text}”</blockquote>
				<figcaption class="mt-4">
					<span class="block font-bold">{t.name}</span>
					<span class="text-sm text-muted">{t.role}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
	<div class="mt-10 rounded-[2rem] bg-maroon px-6 py-10 text-center text-white">
		<h2 class="font-display text-2xl font-bold sm:text-3xl">Loved your meal? Tell us.</h2>
		<p class="mx-auto mt-2 max-w-lg text-white/85">Leave a review on your next visit — the best one each month wins a dinner for two.</p>
		<a href="/reservations" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-8 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.03]">Book Your Next Table</a>
	</div>
</section>
