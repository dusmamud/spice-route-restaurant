<script lang="ts">
	import { Check, Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { dishes, site, testimonials } from '#lib/data/site.ts';

	const more = [
		{ name: 'Imran Qureshi', role: 'Bandra East', rating: 5, text: 'Ordered the tandoori platter for a house party — arrived hot, smoky, and gone in twenty minutes. The delivery packaging is excellent too.', dish: 'Tandoori Platter' },
		{ name: 'Meera Iyer', role: 'Khar', rating: 5, text: 'As a vegetarian, I never feel like an afterthought here. The paneer tikka and dal makhani are genuinely the best in the neighbourhood.', dish: 'Paneer Tikka' }
	];
	type Review = { name: string; role: string; rating: number; text: string; dish: string };
	let userReviews = $state<Review[]>([]);
	const all = $derived([...testimonials, ...more, ...userReviews]);
	const avg = $derived((all.reduce((a, t) => a + t.rating, 0) / all.length).toFixed(1));

	let rName = $state('');
	let rDish = $state(dishes[0].name);
	let rRating = $state(5);
	let rText = $state('');
	let rSent = $state(false);
	let rError = $state('');

	function submitReview() {
		if (!rName.trim() || rText.trim().length < 10) {
			rError = 'Please add your name and a few words about your meal (at least 10 characters).';
			return;
		}
		userReviews = [{ name: rName.trim(), role: 'Guest review · just now', rating: rRating, text: rText.trim(), dish: rDish }, ...userReviews];
		rSent = true;
		rError = '';
	}
</script>

<Seo
	title="Reviews — SpiceRoute Restaurant & Bistro"
	description="What Mumbai says about SpiceRoute, Bandra West: {site.rating} out of 5 across {site.reviewCount.toLocaleString('en-IN')}+ guest reviews. Read them — and leave your own."
	path="/reviews"
	image="hero-biryani"
/>

<PageHero eyebrow="Reviews" title="What Mumbai" script="Says About Us" desc="Real words from regulars, first-timers and food lovers. {avg} out of 5 across {site.reviewCount.toLocaleString('en-IN')}+ guest reviews — these are a few favourites." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 text-center shadow-sm">
		<p class="font-display text-5xl font-bold text-maroon">{site.rating}</p>
		<div class="mt-2 flex justify-center"><Stars rating={site.rating} size={22} /></div>
		<p class="mt-2 text-sm text-muted">Average rating · {site.reviewCount.toLocaleString('en-IN')}+ guest reviews (mock data for design review)</p>
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

	{#if rSent}
		<div class="mx-auto mt-10 max-w-2xl rounded-3xl border border-line bg-green-50 p-8 text-center">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={32} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-2xl font-bold">Thank You, {rName}!</h2>
			<p class="mt-2 text-sm text-muted">Your {rRating}-star review is live above. The best review each month wins a dinner for two — we’ll be in touch if yours wins. (Mock form — stored on this device only.)</p>
			<button type="button" onclick={() => { rSent = false; rName = ''; rText = ''; }} class="mt-5 inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Write Another Review</button>
		</div>
	{:else}
		<form
			class="mx-auto mt-10 max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
			onsubmit={(e) => {
				e.preventDefault();
				submitReview();
			}}
		>
			<h2 class="font-display text-2xl font-bold">Loved your meal? Tell us.</h2>
			<p class="mt-1 text-sm text-muted">Your review appears on this page right away. The best one each month wins a dinner for two.</p>
			<div class="mt-5 grid gap-4 sm:grid-cols-2">
				<div>
					<label for="rev-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
					<input id="rev-name" bind:value={rName} required placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				<div>
					<label for="rev-dish" class="mb-1.5 block text-sm font-bold">Which dish?</label>
					<select id="rev-dish" bind:value={rDish} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none">
						{#each dishes as d}<option value={d.name}>{d.name}</option>{/each}
					</select>
				</div>
			</div>
			<fieldset class="mt-5">
				<legend class="text-sm font-bold">Your rating</legend>
				<div class="mt-2 flex gap-2" role="group" aria-label="Your rating">
					{#each [1, 2, 3, 4, 5] as n}
						<button type="button" onclick={() => (rRating = n)} aria-pressed={rRating === n} aria-label="Rate {n} star{n === 1 ? '' : 's'}" class="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-200 {rRating === n ? 'border-gold bg-gold-pale text-[#9a7b00]' : 'border-line text-muted hover:border-gold'}">
							<Star size={22} fill={rRating >= n ? 'currentColor' : 'none'} aria-hidden="true" />
						</button>
					{/each}
				</div>
			</fieldset>
			<div class="mt-4">
				<label for="rev-text" class="mb-1.5 block text-sm font-bold">Your review *</label>
				<textarea id="rev-text" bind:value={rText} rows="3" required placeholder="What did you love? The biryani, the room, the service…" class="w-full rounded-2xl border border-line bg-cream px-4 py-3 focus:border-gold focus:outline-none"></textarea>
			</div>
			{#if rError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{rError}</p>{/if}
			<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Post My Review</button>
		</form>
	{/if}

	<div class="mt-10 rounded-[2rem] bg-maroon px-6 py-10 text-center text-white">
		<h2 class="font-display text-2xl font-bold sm:text-3xl">Haven’t been yet?</h2>
		<p class="mx-auto mt-2 max-w-lg text-white/85">Book a table and come write the next review yourself.</p>
		<a href="/reservations" class="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-8 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.03]">Book Your Next Table</a>
	</div>
</section>
