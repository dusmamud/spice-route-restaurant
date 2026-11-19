<script lang="ts">
	import { ArrowRight, Clock, Leaf, MapPin, Quote, Star } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import FeatureIcon from '#lib/components/FeatureIcon.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { chefs, dishes, features, galleryItems, inr, pressQuotes, signatureSelections, site, sourcingPartners, testimonials, todaysSpecials } from '#lib/data/site.ts';
	import { openStatus } from '#lib/open.ts';

	let now = $state(new Date());
	const status = $derived(openStatus(now));

	$effect(() => {
		const t = window.setInterval(() => (now = new Date()), 60000);
		return () => window.clearInterval(t);
	});

	const specials = todaysSpecials
		.map((s) => ({ ...s, dish: dishes.find((d) => d.id === s.dishId)! }))
		.filter((s) => s.dish);
	const specialIds = new Set(specials.map((s) => s.dish.id));
	// Chef's Picks must not repeat Today's Specials — pick the highest-rated
	// dishes that are NOT already in the specials row.
	const chefsPicks = dishes
		.filter((d) => !specialIds.has(d.id))
		.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
		.slice(0, 4);
	const marqueeItems = [...dishes.map((d) => d.name), ...dishes.map((d) => d.name)];
</script>

<Seo
	title="SpiceRoute Restaurant & Bistro — A Culinary Journey of Flavors"
	description="SpiceRoute Restaurant & Bistro, Bandra West Mumbai — Hyderabadi biryani, butter chicken, Continental pastas, Asian wok dishes & desserts. Book a table or order online."
	path="/"
	image="hero-biryani"
/>

<!-- HERO — faithful to the reference: dark warm bokeh, copper handi biryani -->
<section class="relative overflow-hidden bg-cocoa-deep text-white" aria-label="Welcome to SpiceRoute">
	<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,160,23,0.18),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(127,29,29,0.25),transparent_50%)]" aria-hidden="true"></div>
	<div class="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20 lg:pb-24">
		<div>
			<p class="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-gold-soft uppercase">
				<Leaf size={14} aria-hidden="true" /> Multi-Cuisine · Bandra West, Mumbai
			</p>
			<h1 class="mt-5 font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] font-bold">
				A Culinary<br />Journey of
				<span class="block font-script text-[clamp(3rem,10vw,5.5rem)] leading-[1.1] font-normal text-gold-soft">Flavors</span>
			</h1>
			<p class="mt-5 max-w-md text-lg leading-relaxed text-white/80">
				Multi-cuisine dining with a perfect blend of tradition and modern taste.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="/reservations" class="flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 font-bold text-cocoa-deep shadow-lg transition-transform duration-200 hover:scale-[1.03]">
					Book a Table <ArrowRight size={18} aria-hidden="true" />
				</a>
				<a href="/menu" class="flex min-h-12 items-center rounded-full border-2 border-white/40 px-7 font-bold text-white transition-colors duration-200 hover:border-gold hover:text-gold-soft">
					Explore the Menu
				</a>
			</div>
			<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
				<span class="flex items-center gap-1.5"><Star size={16} class="text-gold" fill="currentColor" aria-hidden="true" /> {site.rating} · {site.reviewCount.toLocaleString('en-IN')}+ reviews</span>
				<span class="flex items-center gap-1.5">
					<span class="h-2 w-2 rounded-full {status.open ? 'bg-green-400' : 'bg-amber-400'}" aria-hidden="true"></span>
					{status.label} · {status.detail}
				</span>
				<span class="flex items-center gap-1.5"><MapPin size={16} class="text-gold-soft" aria-hidden="true" /> {site.addressShort}</span>
			</div>
		</div>
		<div class="relative">
			<div class="animate-float">
				<Picture
					name="hero-biryani"
					alt="Hyderabadi chicken biryani in a hammered copper handi with raita, steam rising"
					width={1920}
					height={1280}
					sizes="(min-width: 1024px) 50vw, 100vw"
					eager={true}
					imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-2xl"
				/>
			</div>
			<div class="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-xl sm:left-8">
				<span class="flex h-11 w-11 items-center justify-center rounded-full bg-gold-pale text-maroon"><Star size={22} fill="currentColor" aria-hidden="true" /></span>
				<span>
					<span class="block font-display text-lg leading-none font-bold">Hyderabadi Biryani · {inr(349)}</span>
					<span class="mt-1 block text-xs text-muted">Our signature — sealed on dum, served hot</span>
				</span>
			</div>
		</div>
	</div>
</section>

<!-- FEATURE STRIP — cream card, 4 items -->
<section class="px-4 sm:px-6 lg:px-8" aria-label="Why SpiceRoute">
	<div class="reveal mx-auto -mt-6 grid max-w-6xl grid-cols-2 gap-y-6 rounded-[2rem] border border-line bg-white px-4 py-7 shadow-lg sm:-mt-8 lg:grid-cols-4">
		{#each features as f, i}
			<div class="flex flex-col items-center gap-2 px-3 text-center {i > 0 ? 'lg:border-l lg:border-line' : ''}">
				<span class="text-maroon"><FeatureIcon icon={f.icon} title={f.title} /></span>
				<h2 class="font-display text-base leading-tight font-bold sm:text-lg">{f.title}</h2>
				<p class="max-w-[16rem] text-xs leading-relaxed text-muted">{f.desc}</p>
			</div>
		{/each}
	</div>
</section>

<!-- SIGNATURE SELECTIONS -->
<section class="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8" aria-label="Our signature selections" id="signatures">
	<div class="reveal flex items-center gap-4">
		<span class="h-px flex-1 bg-line" aria-hidden="true"></span>
		<h2 class="text-center font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold italic">Our Signature Selections</h2>
		<span class="h-px flex-1 bg-line" aria-hidden="true"></span>
	</div>
	<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
		{#each signatureSelections as s}
			<a href={s.href} class="group relative block overflow-hidden rounded-3xl shadow-md">
				<Picture
					name={s.image}
					alt={s.alt}
					width={800}
					height={533}
					sizes="(min-width: 1024px) 25vw, 50vw"
					imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-deep/90 via-cocoa-deep/50 to-transparent px-4 pt-10 pb-4 text-center">
					<span class="block font-display text-lg leading-tight font-bold text-white sm:text-xl">{s.title}</span>
					<span class="mt-1 hidden text-xs text-white/80 sm:block">{s.desc}</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<!-- TODAY'S SPECIALS -->
<section class="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8" aria-label="Today's specials">
	<div class="reveal flex flex-wrap items-end justify-between gap-3">
		<div>
			<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">Fresh from the kitchen</p>
			<h2 class="mt-2 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Today's Specials</h2>
		</div>
		<a href="/menu" class="flex min-h-12 items-center gap-1.5 rounded-full border-2 border-cocoa px-5 font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">Full Menu <ArrowRight size={18} aria-hidden="true" /></a>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each specials as s}
			<DishCard dish={s.dish} />
		{/each}
	</div>
</section>

<!-- MARQUEE -->
<div class="marquee mt-16 overflow-hidden border-y border-line bg-cocoa py-3" aria-hidden="true">
	<div class="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
		{#each marqueeItems as name}
			<span class="flex items-center gap-8 text-sm font-semibold tracking-[0.18em] text-gold-soft uppercase">{name} <span class="text-gold">✦</span></span>
		{/each}
	</div>
</div>

<!-- ABOUT -->
<section class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8" aria-label="About SpiceRoute">
	<div class="reveal relative">
		<Picture
			name="dining-room"
			alt="Warm SpiceRoute dining room with pendant lights and set tables"
			width={1920}
			height={1280}
			sizes="(min-width: 1024px) 50vw, 100vw"
			imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl"
		/>
		<div class="absolute -right-2 -bottom-5 hidden rounded-2xl bg-cocoa-deep px-5 py-4 text-white shadow-xl sm:block">
			<p class="font-display text-3xl font-bold text-gold-soft">10+ yrs</p>
			<p class="text-xs text-white/75">of serving Bandra</p>
		</div>
	</div>
	<div class="reveal">
		<p class="flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-maroon uppercase">About Us <span class="h-px w-12 bg-maroon" aria-hidden="true"></span></p>
		<h2 class="mt-3 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-bold">
			More Than<br />a <em class="text-gold not-italic font-script text-[clamp(2.4rem,6vw,3.6rem)] leading-none font-normal">Restaurant</em>
		</h2>
		<p class="mt-4 max-w-lg leading-relaxed text-muted">
			A place to unwind, celebrate and savor great food, crafted with passion and served with warmth. From dum biryanis sealed at dusk to lava cakes baked to order — every plate carries a little of our journey along the spice route.
		</p>
		<ul class="mt-5 space-y-2 text-sm font-medium">
			<li class="flex gap-2"><span class="text-gold" aria-hidden="true">✦</span> Tandoor, wok &amp; patisserie — three kitchens, one table</li>
			<li class="flex gap-2"><span class="text-gold" aria-hidden="true">✦</span> Farm vegetables every morning, Alphonso mangoes in season</li>
			<li class="flex gap-2"><span class="text-gold" aria-hidden="true">✦</span> Private dining room for 12, and catering for up to 500</li>
		</ul>
		<a href="/about" class="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-cocoa px-7 font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">
			Learn More <ArrowRight size={18} aria-hidden="true" />
		</a>
	</div>
</section>

<!-- CHEF'S PICKS -->
<section class="bg-cream-deep/60 py-16" aria-label="Chef's picks">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="reveal text-center">
			<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">From the chef's pass</p>
			<h2 class="mt-2 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Chef's Picks</h2>
			<p class="mx-auto mt-3 max-w-xl text-muted">The dishes our kitchen is proudest of — ordered most, remembered longest.</p>
		</div>
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each chefsPicks as dish}
				<DishCard {dish} />
			{/each}
		</div>
	</div>
</section>

<!-- MEET THE CHEFS -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-label="Meet the chefs">
	<div class="reveal flex flex-wrap items-end justify-between gap-3">
		<div>
			<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">The people behind the pass</p>
			<h2 class="mt-2 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Meet the Chefs</h2>
		</div>
		<a href="/chefs" class="flex min-h-12 items-center gap-1.5 rounded-full border-2 border-cocoa px-5 font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">All Chefs <ArrowRight size={18} aria-hidden="true" /></a>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-3">
		{#each chefs as chef}
			<a href="/chefs" class="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
				<Picture name={chef.image} alt={chef.alt} width={1280} height={1600} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				<span class="block p-5">
					<span class="block text-xs font-bold tracking-[0.2em] text-maroon uppercase">{chef.role}</span>
					<span class="mt-1 block font-display text-xl font-bold group-hover:text-maroon">{chef.name}</span>
					<span class="mt-1 block text-sm text-muted">{chef.years} · “{chef.quote}”</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<!-- TESTIMONIALS -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-label="What guests say">
	<div class="reveal text-center">
		<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">Guest Love</p>
		<h2 class="mt-2 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">What Mumbai Says</h2>
	</div>
	<div class="mt-8 grid gap-5 md:grid-cols-2">
		{#each testimonials as t}
			<figure class="reveal rounded-3xl border border-line bg-white p-6 shadow-sm">
				<Quote size={28} class="text-gold" fill="currentColor" aria-hidden="true" />
				<blockquote class="mt-3 leading-relaxed">“{t.text}”</blockquote>
				<figcaption class="mt-4 flex items-center justify-between gap-3">
					<span>
						<span class="block font-bold">{t.name}</span>
						<span class="text-sm text-muted">{t.role} · loved the {t.dish}</span>
					</span>
					<Stars rating={t.rating} />
				</figcaption>
			</figure>
		{/each}
	</div>
	<div class="mt-6 text-center">
		<a href="/reviews" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-cocoa px-7 font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">Read All Reviews <ArrowRight size={18} aria-hidden="true" /></a>
	</div>
</section>

<!-- PRESS -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="In the press">
	<div class="reveal grid gap-5 rounded-[2rem] border border-line bg-white p-6 shadow-sm sm:p-8 md:grid-cols-3">
		{#each pressQuotes.slice(0, 3) as q}
			<figure>
				<Quote size={24} class="text-gold" fill="currentColor" aria-hidden="true" />
				<blockquote class="mt-2 leading-relaxed">“{q.quote}”</blockquote>
				<figcaption class="mt-3 text-sm font-bold">{q.source} <span class="font-normal text-muted">· {q.date}</span></figcaption>
			</figure>
		{/each}
	</div>
	<p class="mt-4 text-center text-sm"><a href="/press" class="font-bold text-maroon underline underline-offset-4">More press &amp; awards →</a></p>
</section>

<!-- HOURS / LOCATION STRIP -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Visit us">
	<div class="reveal grid gap-5 rounded-[2rem] bg-cocoa-deep p-6 text-white sm:p-8 lg:grid-cols-3">
		<div class="flex gap-3">
			<MapPin size={24} class="shrink-0 text-gold-soft" aria-hidden="true" />
			<div>
				<h3 class="font-display text-lg font-bold">Find Us</h3>
				<p class="mt-1 text-sm leading-relaxed text-white/75">{site.address}</p>
			</div>
		</div>
		<div class="flex gap-3">
			<Clock size={24} class="shrink-0 text-gold-soft" aria-hidden="true" />
			<div>
				<h3 class="font-display text-lg font-bold">Hours</h3>
				<p class="mt-1 text-sm leading-relaxed text-white/75">{site.hours}<br />Lunch 11:30 AM – 3:30 PM · Dinner 7 – 11 PM</p>
			</div>
		</div>
		<div class="flex flex-col items-start justify-center gap-3">
			<a href="/reservations" class="flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.03]">Book a Table</a>
			<a href="tel:{site.phoneHref.replace('tel:', '')}" class="text-sm font-semibold text-gold-soft underline underline-offset-4">{site.phoneDisplay}</a>
		</div>
	</div>
</section>

<!-- SOURCING -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Where our food comes from">
	<div class="reveal grid gap-5 lg:grid-cols-[1fr_2fr]">
		<div class="overflow-hidden rounded-[2rem] shadow-md">
			<Picture name="sourcing-farm" alt="Fresh farm vegetables, Alphonso mangoes and spices in brass bowls" width={1920} height={1280} sizes="(min-width: 1024px) 33vw, 100vw" imgClass="h-full min-h-56 w-full object-cover" />
		</div>
		<div>
			<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">From our farms</p>
			<h2 class="mt-2 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Named Farms, Named Spices</h2>
			<p class="mt-3 max-w-xl leading-relaxed text-muted">We buy from people we know, by name — so the menu can tell you exactly where your food came from.</p>
			<ul class="mt-5 space-y-3">
				{#each sourcingPartners as p}
					<li class="flex gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-sm">
						<span class="text-gold" aria-hidden="true">✦</span>
						<span><strong>{p.name}</strong> — {p.what}<br /><span class="text-sm text-muted">{p.detail}</span></span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- GALLERY STRIP -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="From our gallery">
	<div class="reveal flex flex-wrap items-end justify-between gap-3">
		<h2 class="font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Moments at SpiceRoute</h2>
		<a href="/gallery" class="flex min-h-12 items-center gap-1.5 rounded-full border-2 border-cocoa px-5 font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">View Gallery <ArrowRight size={18} aria-hidden="true" /></a>
	</div>
	<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
		{#each galleryItems.slice(0, 4) as g}
			<a href="/gallery" class="group relative block overflow-hidden rounded-3xl shadow-md">
				<Picture name={g.image} alt={g.alt} width={800} height={533} sizes="(min-width: 1024px) 25vw, 50vw" imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-deep/90 to-transparent px-4 pt-8 pb-3 text-sm font-semibold text-white">{g.caption}</span>
			</a>
		{/each}
	</div>
</section>

<!-- BOTTOM CTA — deep red with spices -->
<section class="relative overflow-hidden bg-maroon px-4 py-16 text-center text-white sm:px-6" aria-label="Dine with us today">
	<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(212,160,23,0.25),transparent_50%),radial-gradient(ellipse_at_85%_90%,rgba(0,0,0,0.35),transparent_55%)]" aria-hidden="true"></div>
	<div class="relative mx-auto max-w-3xl">
		<h2 class="font-display text-[clamp(2rem,6vw,3rem)] font-bold">Dine With Us Today!</h2>
		<p class="mt-3 text-lg text-white/85">Good Food &nbsp;|&nbsp; Great Ambience &nbsp;|&nbsp; Memorable Moments</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="/reservations" class="flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 font-bold text-cocoa-deep shadow-lg transition-transform duration-200 hover:scale-[1.03]">
				Reserve Your Table <ArrowRight size={18} aria-hidden="true" />
			</a>
			<a href="/order" class="flex min-h-12 items-center rounded-full border-2 border-white/50 px-8 font-bold text-white transition-colors duration-200 hover:border-gold hover:text-gold-soft">Order Online</a>
		</div>
	</div>
</section>
