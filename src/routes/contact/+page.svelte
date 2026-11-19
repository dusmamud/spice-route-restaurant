<script lang="ts">
	import { Check, Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);
	let formError = $state('');

	function submit() {
		if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.trim().length < 10) {
			formError = 'Please enter your name, a valid email, and a message of at least 10 characters.';
			return;
		}
		formError = '';
		sent = true;
	}
</script>

<PageHero eyebrow="Contact" title="Find Us," script="Talk to Us" desc="Questions, feedback, bulk orders or a big celebration — we reply within one working day." />

<section class="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
	<div>
		<div class="space-y-4">
			<div class="flex gap-3 rounded-3xl border border-line bg-white p-5 shadow-sm">
				<MapPin size={24} class="shrink-0 text-maroon" aria-hidden="true" />
				<div><h2 class="font-display text-lg font-bold">Address</h2><p class="mt-1 text-sm leading-relaxed text-muted">{site.address}</p></div>
			</div>
			<div class="flex gap-3 rounded-3xl border border-line bg-white p-5 shadow-sm">
				<Clock size={24} class="shrink-0 text-maroon" aria-hidden="true" />
				<div><h2 class="font-display text-lg font-bold">Hours</h2><p class="mt-1 text-sm leading-relaxed text-muted">{site.hours}<br />Lunch 11:30 AM – 3:30 PM · Dinner 7 – 11 PM</p></div>
			</div>
			<div class="flex gap-3 rounded-3xl border border-line bg-white p-5 shadow-sm">
				<Phone size={24} class="shrink-0 text-maroon" aria-hidden="true" />
				<div><h2 class="font-display text-lg font-bold">Phone &amp; WhatsApp</h2><p class="mt-1 text-sm leading-relaxed text-muted"><a class="font-semibold text-cocoa underline underline-offset-4" href={site.phoneHref}>{site.phoneDisplay}</a> · <a class="font-semibold text-cocoa underline underline-offset-4" href={site.whatsappHref} target="_blank" rel="noopener">WhatsApp us</a></p></div>
			</div>
			<div class="flex gap-3 rounded-3xl border border-line bg-white p-5 shadow-sm">
				<Mail size={24} class="shrink-0 text-maroon" aria-hidden="true" />
				<div><h2 class="font-display text-lg font-bold">Email</h2><p class="mt-1 text-sm leading-relaxed text-muted"><a class="font-semibold text-cocoa underline underline-offset-4" href="mailto:{site.email}">{site.email}</a></p></div>
			</div>
		</div>
		<div class="mt-6">
			<h2 class="font-display text-lg font-bold">Delivery zones</h2>
			<ul class="mt-3 flex flex-wrap gap-2">
				{#each site.areas as a}<li class="rounded-full bg-cream-deep px-3 py-1.5 text-sm font-medium">{a}</li>{/each}
			</ul>
			<p class="mt-3 text-sm text-muted">Free delivery on orders of ₹499+. A ₹40 fee applies below that. GST of 5% applies on food.</p>
		</div>
	</div>

	<div>
		{#if sent}
			<div class="rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={32} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-2xl font-bold">Message sent!</h2>
				<p class="mt-2 text-muted">Thank you, {name}. We will reply to {email} within one working day. (Mock form — nothing was actually sent.)</p>
				<button type="button" onclick={() => { sent = false; name = ''; email = ''; message = ''; }} class="mt-5 inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-cocoa-deep">Send Another Message</button>
			</div>
		{:else}
			<form
				class="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<h2 class="font-display text-2xl font-bold">Send us a message</h2>
				<div class="mt-5 space-y-4">
					<div>
						<label for="ct-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
						<input id="ct-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="ct-email" class="mb-1.5 block text-sm font-bold">Email *</label>
						<input id="ct-email" type="email" bind:value={email} required autocomplete="email" placeholder="you@example.com" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="ct-message" class="mb-1.5 block text-sm font-bold">Message *</label>
						<textarea id="ct-message" bind:value={message} required rows="5" placeholder="Tell us about your celebration, feedback or question…" class="w-full rounded-2xl border border-line bg-cream px-4 py-3 focus:border-gold focus:outline-none"></textarea>
					</div>
				</div>
				{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.01]">Send Message</button>
				<p class="mt-3 text-center text-xs text-muted">Mock form for design review — nothing is actually sent.</p>
			</form>
		{/if}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
	<h2 class="sr-only">Map — SpiceRoute location</h2>
	<iframe
		title="Map showing SpiceRoute Restaurant & Bistro, Linking Road, Bandra West, Mumbai"
		src={site.mapEmbed}
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		class="h-[22rem] w-full rounded-[2rem] border border-line shadow-sm"
	></iframe>
</section>
