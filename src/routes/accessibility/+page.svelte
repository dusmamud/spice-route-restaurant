<script lang="ts">
	import { Accessibility, Ear, Eye, HeartHandshake, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<Seo
	title="Accessibility — SpiceRoute Restaurant & Bistro"
	description="SpiceRoute’s accessibility statement: step-free access, wheelchair-accessible seating, large-print menus, service animals welcome. Last reviewed November 2026."
	path="/accessibility"
	image="dining-room"
/>

<PageHero eyebrow="Accessibility" title="Everyone’s" script="Welcome Here" desc="Good food should be easy to reach, read and enjoy. Here is what we do — and what we’re still working on." />

<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<p class="rounded-2xl bg-gold-pale px-5 py-4 text-sm font-medium text-cocoa">
		Accessibility statement — last reviewed <strong>November 2026</strong>. We aim for WCAG 2.2 AA across this website and the restaurant, and we review both every six months.
	</p>

	<div class="mt-8 grid gap-5 sm:grid-cols-2">
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Accessibility size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Step-free access</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">The restaurant is on the 2nd floor with lift access from street level. The entrance, dining room and washrooms are step-free, with a wheelchair-accessible washroom on the same floor. Ask for a wheelchair-accessible table when you book — or pick it in the seating preference on the reservation form.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Eye size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Reading the menu</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Large-print menus are available on request, and our team is happy to read the menu aloud. This website works at 200% zoom without horizontal scrolling, and with screen readers — menus are real text, never images or PDFs.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><Ear size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Hearing &amp; communication</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Our dining room is lively on Friday evenings; ask for a quieter corner table if that helps. Staff are trained to speak clearly, face you when talking, and write down specials on request. Written orders (WhatsApp or note) are always welcome.</p>
		</div>
		<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
			<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><HeartHandshake size={24} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-xl font-bold">Service animals &amp; assistance</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Service animals are welcome everywhere in the restaurant, with water on request. If you need anything else — a high chair, a specific seat, a quiet word with the kitchen about an allergy — tell us when you book, and we’ll have it ready.</p>
		</div>
	</div>

	<h2 class="mt-12 font-display text-2xl font-bold">On this website</h2>
	<ul class="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted">
		<li>Full keyboard support — every menu, filter, drawer and form works without a mouse, with a visible focus ring.</li>
		<li>Skip-to-content link, labelled buttons and form fields, and alt text on every food photo.</li>
		<li>Animations respect <em>prefers-reduced-motion</em>; the marquee and floating hero pause for reduced-motion users.</li>
		<li>Text contrast meets WCAG 2.2 AA (4.5:1 for body text), and tap targets are 44–48px.</li>
	</ul>

	<div class="mt-10 rounded-[2rem] bg-cocoa-deep p-8 text-white">
		<h2 class="flex items-center gap-2 font-display text-2xl font-bold"><Phone size={22} class="text-gold-soft" aria-hidden="true" /> Tell Us What You Need</h2>
		<p class="mt-2 max-w-2xl text-white/75">The best accessibility is a conversation. Call us before your visit and we’ll sort seating, menus, allergies or anything else — no forms, no fuss.</p>
		<p class="mt-4 font-bold"><a href={site.phoneHref} class="text-gold-soft underline underline-offset-4">{site.phoneDisplay}</a> · <a href="mailto:{site.email}" class="text-gold-soft underline underline-offset-4">{site.email}</a></p>
	</div>
</section>
