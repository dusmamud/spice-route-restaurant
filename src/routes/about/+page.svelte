<script lang="ts">
	import { ArrowRight, Award, Heart, Leaf, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';

	const timeline = [
		{ year: '2016', title: 'A 12-table beginning', text: 'SpiceRoute opens on Linking Road with one tandoor, one wok and a family recipe book.' },
		{ year: '2019', title: 'The biryani finds its fans', text: 'Our dum biryani becomes Bandra’s worst-kept secret — handis sell out most Saturdays.' },
		{ year: '2022', title: 'A second kitchen', text: 'A dedicated Continental & Asian kitchen opens, and the lava cake joins the menu.' },
		{ year: '2026', title: 'Today', text: 'Three kitchens, a private dining room, catering for 500 — and the same family recipes.' }
	];
	const values = [
		{ icon: Leaf, title: 'Fresh, daily', text: 'Vegetables from the morning market, spices ground in-house every week.' },
		{ icon: Users, title: 'People first', text: 'Half our team has been with us since day one. Regulars are family.' },
		{ icon: Award, title: 'Craft over shortcuts', text: 'Dal makhani simmers 12 hours. Biryani is sealed on dum. No exceptions.' },
		{ icon: Heart, title: 'Served with warmth', text: 'We remember names, allergies, anniversaries — and your usual table.' }
	];
</script>

<Seo
	title="About Us — SpiceRoute Restaurant & Bistro, Bandra West"
	description="Our story since 2016: one tandoor, one wok and a family recipe book — now three kitchens, a private dining room and catering for 500 in Bandra West, Mumbai."
	path="/about"
	image="dining-room"
/>

<PageHero eyebrow="About Us" title="More Than" script="a Restaurant" desc="A place to unwind, celebrate and savor great food, crafted with passion and served with warmth." />

<section class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
	<div>
		<Picture name="chef-portrait" alt="SpiceRoute chef plating a dish in the kitchen" width={1920} height={1280} sizes="(min-width: 1024px) 50vw, 100vw" eager={true} imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl" />
	</div>
	<div>
		<h2 class="font-display text-[clamp(1.75rem,4.5vw,2.5rem)] leading-tight font-bold">Our Story</h2>
		<p class="mt-4 leading-relaxed text-muted">
			SpiceRoute began in 2016 as a 12-table room on Linking Road, Bandra West, with a simple idea: the spice routes once connected continents through food — why shouldn’t one restaurant do the same? Our grandmother’s dum biryani shared a menu with a Continental pasta and a wok-tossed Hakka noodle, and Mumbai embraced it.
		</p>
		<p class="mt-4 leading-relaxed text-muted">
			Ten years on, we run three kitchens under one roof — tandoor, wok and patisserie — but the rule hasn’t changed: cook it fresh, cook it honestly, and serve it like family. {site.established} to today, that’s the whole recipe.
		</p>
		<div class="mt-6 grid grid-cols-3 gap-4 text-center">
			<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="font-display text-3xl font-bold text-maroon">10+</p><p class="mt-1 text-xs text-muted">Years serving Bandra</p></div>
			<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="font-display text-3xl font-bold text-maroon">17</p><p class="mt-1 text-xs text-muted">Signature dishes</p></div>
			<div class="rounded-2xl bg-white p-4 shadow-sm"><p class="font-display text-3xl font-bold text-maroon">4.8</p><p class="mt-1 text-xs text-muted">Average guest rating</p></div>
		</div>
	</div>
</section>

<section class="bg-cream-deep/60 py-14">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-center font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">What We Stand For</h2>
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as v}
				<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><v.icon size={24} aria-hidden="true" /></span>
					<h3 class="mt-4 font-display text-lg font-bold">{v.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-4xl px-4 py-14 sm:px-6">
	<h2 class="text-center font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">The Journey So Far</h2>
	<ol class="mt-10 space-y-6 border-l-2 border-gold pl-6">
		{#each timeline as t}
			<li class="relative">
				<span class="absolute top-1 -left-[1.95rem] h-4 w-4 rounded-full border-2 border-gold bg-cream" aria-hidden="true"></span>
				<p class="font-display text-xl font-bold text-maroon">{t.year} — {t.title}</p>
				<p class="mt-1 leading-relaxed text-muted">{t.text}</p>
			</li>
		{/each}
	</ol>
	<div class="mt-12 text-center">
		<a href="/reservations" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.03]">
			Come Dine With Us <ArrowRight size={18} aria-hidden="true" />
		</a>
	</div>
</section>
