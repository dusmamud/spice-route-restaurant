<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/playfair-display/800.css';
	import '@fontsource/playfair-display/900.css';
	import '@fontsource/great-vibes/400.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { Phone, ShoppingBag } from '@lucide/svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import WhatsAppIcon from '#lib/components/WhatsAppIcon.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { site } from '#lib/data/site.ts';

	let { children } = $props();

	// Restaurant JSON-LD. No aggregateRating: Google forbids self-published
	// star ratings in schema. No FAQPage schema: Google ended FAQ rich results.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: site.name,
		slogan: site.tagline,
		description:
			'SpiceRoute Restaurant & Bistro — multi-cuisine dining in Bandra West, Mumbai. Hyderabadi biryani, butter chicken, Continental pastas, Asian wok dishes and desserts, crafted with passion and served with warmth.',
		telephone: site.phoneDisplay,
		email: site.email,
		servesCuisine: ['North Indian', 'Continental', 'Asian', 'Desserts'],
		priceRange: '₹₹',
		url: site.url,
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Linking Road, Bandra West',
			addressLocality: 'Mumbai',
			addressRegion: 'Maharashtra',
			postalCode: '400050',
			addressCountry: 'IN'
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '11:30',
			closes: '23:00'
		},
		menu: `${site.url}/menu`,
		acceptsReservations: 'True',
		hasMap: 'https://www.google.com/maps/search/SpiceRoute+Restaurant+Bandra+West+Mumbai',
		geo: { '@type': 'GeoCoordinates', latitude: 19.0596, longitude: 72.8295 },
		sameAs: ['https://www.instagram.com/', 'https://www.facebook.com/']
	};

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true, syncTouch: false });
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>SpiceRoute Restaurant &amp; Bistro — A Culinary Journey of Flavors</title>
	<meta
		name="description"
		content="SpiceRoute Restaurant & Bistro, Bandra West Mumbai — Hyderabadi biryani, butter chicken, Continental pastas, Asian wok dishes & desserts. Book a table or order online."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="SpiceRoute Restaurant & Bistro — A Culinary Journey of Flavors" />
	<meta
		property="og:description"
		content="Multi-cuisine dining with a perfect blend of tradition and modern taste. Book a table or order online in Bandra West, Mumbai."
	/>
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cocoa px-5 py-3 focus:text-white"
>
	Skip to main content
</a>

<div
	id="scroll-progress"
	class="fixed top-0 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-gold"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Footer />

<a
	href={site.whatsappHref}
	target="_blank"
	rel="noopener"
	aria-label="Chat with SpiceRoute on WhatsApp"
	class="fixed right-5 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-105 md:flex"
>
	<WhatsAppIcon size={26} />
</a>

<nav
	aria-label="Quick actions"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a href={site.phoneHref} class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<Phone size={20} class="text-maroon" aria-hidden="true" />
		Call
	</a>
	<a
		href={site.whatsappHref}
		target="_blank"
		rel="noopener"
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink"
	>
		<span class="text-[#25d366]"><WhatsAppIcon size={20} /></span>
		WhatsApp
	</a>
	<button
		type="button"
		onclick={() => (drawer.open = true)}
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-gold text-sm font-bold text-cocoa-deep"
	>
		<ShoppingBag size={20} aria-hidden="true" />
		Order{#if cart.count > 0} ({cart.count}){/if}
	</button>
</nav>
<div class="h-14 lg:hidden" aria-hidden="true"></div>

<CartDrawer bind:open={drawer.open} />
