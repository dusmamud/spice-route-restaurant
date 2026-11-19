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
	import { afterNavigate, onNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { CalendarCheck, Phone, ShoppingBag } from '@lucide/svelte';
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
		image: `${site.url}/images/hero-biryani-1200.jpg`,
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
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				opens: '11:30',
				closes: '15:30'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				opens: '19:00',
				closes: '23:00'
			}
		],
		menu: `${site.url}/menu`,
		hasMenu: {
			'@type': 'Menu',
			url: `${site.url}/menu`,
			hasMenuSection: [
				{ '@type': 'MenuSection', name: 'Indian Classics', url: `${site.url}/menu?category=Indian%20Classics` },
				{ '@type': 'MenuSection', name: 'Continental', url: `${site.url}/menu?category=Continental` },
				{ '@type': 'MenuSection', name: 'Asian', url: `${site.url}/menu?category=Asian` },
				{ '@type': 'MenuSection', name: 'Desserts', url: `${site.url}/menu?category=Desserts` },
				{ '@type': 'MenuSection', name: 'Beverages', url: `${site.url}/menu?category=Beverages` },
				{ '@type': 'MenuSection', name: 'Breads & Rice', url: `${site.url}/menu?category=Breads%20%26%20Rice` }
			]
		},
		acceptsReservations: 'True',
		hasMap: site.directionsUrl,
		geo: { '@type': 'GeoCoordinates', latitude: 19.0596, longitude: 72.8295 },
		sameAs: [site.socials.instagram, site.socials.facebook, site.socials.x]
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

	// View Transitions, reduced-motion gated: a 200ms crossfade between pages.
	// Skipped entirely when the browser has no View Transitions API or the
	// user prefers reduced motion.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Reveal-on-scroll. The layout persists across client-side navigation,
	// so .reveal elements on a newly visited page must be observed again —
	// afterNavigate re-runs the observer. Elements already visible are
	// skipped (they already carry .is-visible).
	let revealObserver: IntersectionObserver | null = null;
	function observeReveals() {
		if (revealObserver) revealObserver.disconnect();
		revealObserver = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObserver!.observe(el));
	}
	afterNavigate(() => observeReveals());
	$effect(() => {
		observeReveals();
		return () => revealObserver?.disconnect();
	});
</script>

<svelte:head>
	<!-- Per-page title/description/canonical/OG live on each page via the Seo
	     component — the layout carries only the shared Restaurant JSON-LD. -->
	<meta property="og:type" content="website" />
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
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
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
	<a href="/reservations" class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<CalendarCheck size={20} class="text-maroon" aria-hidden="true" />
		Book
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
