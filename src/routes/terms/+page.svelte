<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<PageHero eyebrow="Terms of Service" title="The Fine Print," script="in Plain Words" desc="Last updated: 19 November 2026. This is a mock terms page for design review." />

<section class="mx-auto max-w-3xl px-4 py-10 leading-relaxed text-muted sm:px-6 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_p]:mt-3">
	<h2>About this website</h2>
	<p>This website is a design mock for {site.name}. Menus, prices, offers and availability shown here are placeholders and may not reflect the live restaurant. Orders and reservations placed here are mock transactions — no payment is taken and no real booking is made.</p>
	<h2>Reservations</h2>
	<p>Tables are held for 15 minutes past the booked time. Parties of 8 or more, and the private dining room, are confirmed by phone. We may cancel a booking if we cannot reach you; we will always try to call first.</p>
	<h2>Orders &amp; delivery</h2>
	<p>Delivery is free on orders of ₹499 and above within our delivery zones; a ₹40 fee applies below that. GST of 5% applies on food. Delivery times are estimates — weather and traffic can delay us, and we will call you if they do.</p>
	<h2>Allergies</h2>
	<p>Please tell us about any allergy before ordering. Our kitchen handles nuts, gluten, dairy, egg, soy, sesame and mustard, so we cannot guarantee a dish is completely free of any allergen.</p>
	<h2>Changes</h2>
	<p>We may update these terms and the menu at any time. The version on this page is the one that applies. Questions? Write to {site.email} or call {site.phoneDisplay}.</p>
</section>
