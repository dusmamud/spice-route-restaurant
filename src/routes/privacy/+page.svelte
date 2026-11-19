<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<PageHero eyebrow="Privacy Policy" title="Your Privacy," script="Respected" desc="Last updated: 19 November 2026. This is a mock policy for design review." />

<section class="mx-auto max-w-3xl px-4 py-10 leading-relaxed text-muted sm:px-6 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_p]:mt-3">
	<h2>What we collect</h2>
	<p>When you book a table, place an order or send us a message, we collect the details you give us — your name, phone number, email and address — only to fulfil that request. We do not sell or share your personal data with third parties for marketing.</p>
	<h2>How we use it</h2>
	<p>Your details are used to confirm reservations and orders, to contact you about them, and — only if you ask us to — to send you offers. You can ask us to stop at any time by writing to {site.email}.</p>
	<h2>Cookies &amp; analytics</h2>
	<p>This website is a static frontend demo. It sets no tracking cookies and runs no third-party analytics in this mock version. If analytics are added later, this policy will be updated and a cookie banner will appear.</p>
	<h2>Your rights</h2>
	<p>You may ask us at any time to see, correct or delete the personal data we hold about you. Write to {site.email} or call {site.phoneDisplay} and we will respond within 7 working days.</p>
	<h2>Contact</h2>
	<p>{site.name}, {site.addressShort}, Mumbai 400050 · {site.email} · {site.phoneDisplay}</p>
</section>
