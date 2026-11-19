<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import Logo from '#lib/components/Logo.svelte';
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import { site } from '#lib/data/site.ts';

	const explore = [
		{ label: 'Full Menu', href: '/menu' },
		{ label: 'Order Online', href: '/order' },
		{ label: 'Book a Table', href: '/reservations' },
		{ label: 'Offers', href: '/offers' },
		{ label: 'Gallery', href: '/gallery' },
		{ label: 'Private Dining & Catering', href: '/catering' }
	];
	const about = [
		{ label: 'Our Story', href: '/about' },
		{ label: 'Reviews', href: '/reviews' },
		{ label: 'FAQ', href: '/faq' },
		{ label: 'Contact', href: '/contact' },
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms', href: '/terms' }
	];
</script>

<footer class="bg-cocoa-deep pt-14 pb-8 text-white/80" aria-label="Footer">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
			<div>
				<Logo />
				<p class="mt-4 max-w-sm text-sm leading-relaxed">
					A culinary journey of flavors — multi-cuisine dining with a perfect blend of tradition and modern taste, in the heart of Bandra West.
				</p>
				<div class="mt-5 flex items-center gap-3">
					<a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="SpiceRoute on Instagram" class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-gold hover:text-cocoa-deep"><SocialIcon network="instagram" size={20} /></a>
					<a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="SpiceRoute on Facebook" class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-gold hover:text-cocoa-deep"><SocialIcon network="facebook" size={20} /></a>
					<a href="https://x.com/" target="_blank" rel="noopener" aria-label="SpiceRoute on X" class="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-gold hover:text-cocoa-deep"><SocialIcon network="x" size={20} /></a>
				</div>
			</div>
			<nav aria-label="Explore">
				<h2 class="font-display text-lg font-bold text-white">Explore</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each explore as l}<li><a class="transition-colors hover:text-gold-soft" href={l.href}>{l.label}</a></li>{/each}
				</ul>
			</nav>
			<nav aria-label="About">
				<h2 class="font-display text-lg font-bold text-white">About</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each about as l}<li><a class="transition-colors hover:text-gold-soft" href={l.href}>{l.label}</a></li>{/each}
				</ul>
			</nav>
			<div>
				<h2 class="font-display text-lg font-bold text-white">Visit Us</h2>
				<ul class="mt-4 space-y-3 text-sm leading-relaxed">
					<li class="flex gap-2.5"><MapPin size={18} class="mt-0.5 shrink-0 text-gold-soft" aria-hidden="true" />{site.addressShort} 400050</li>
					<li class="flex gap-2.5"><Clock size={18} class="mt-0.5 shrink-0 text-gold-soft" aria-hidden="true" />{site.hours}</li>
					<li class="flex gap-2.5"><Phone size={18} class="mt-0.5 shrink-0 text-gold-soft" aria-hidden="true" /><a class="hover:text-gold-soft" href={site.phoneHref}>{site.phoneDisplay}</a></li>
					<li class="flex gap-2.5"><Mail size={18} class="mt-0.5 shrink-0 text-gold-soft" aria-hidden="true" /><a class="hover:text-gold-soft" href="mailto:{site.email}">{site.email}</a></li>
				</ul>
			</div>
		</div>
		<div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
			<p>© 2026 {site.name}. All rights reserved. {site.fssai}.</p>
			<p>Mock website — menu, prices &amp; details are placeholders for design review.</p>
		</div>
	</div>
</footer>
