<script lang="ts">
	import { Check, Crown, Sparkles, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { cateringPackages, inr } from '#lib/data/site.ts';

	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let guests = $state(50);
	let pkg = $state('Gold');
	let sent = $state(false);
	let formError = $state('');

	function submit() {
		if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, '')) || !date) {
			formError = 'Please enter your name, a valid 10-digit mobile number, and an event date.';
			return;
		}
		if (!Number.isFinite(guests) || guests < 20 || guests > 500) {
			formError = 'Catering covers 20 to 500 guests. For fewer than 20, our private dining room seats up to 12 — see the private dining page.';
			return;
		}
		formError = '';
		sent = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="Private Dining & Catering — SpiceRoute Restaurant & Bistro"
	description="Private dining for 12 and catering for 20–500 guests in Bandra West, Mumbai. Silver ₹499, Gold ₹799, Platinum ₹1,199 per person, with live counters and a dedicated event manager."
	path="/catering"
	image="private-dining"
/>

<PageHero eyebrow="Private Dining & Catering" title="Celebrate," script="We'll Cook" desc="A private dining room for 12, and catering for 20 to 500 guests — weddings, office parties, birthdays and everything in between." />

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<Picture name="private-dining" alt="Elegant private dining room with a long table set for twelve" width={1920} height={1280} sizes="(min-width: 1024px) 50vw, 100vw" eager={true} imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl" />
			<div class="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm">
				<h2 class="flex items-center gap-2 font-display text-xl font-bold"><Users size={22} class="text-maroon" aria-hidden="true" /> The Private Dining Room</h2>
				<p class="mt-2 leading-relaxed text-muted">
					Twelve seats around one long table, candle-lit, with a dedicated server and a set menu chosen with our chef. Ideal for anniversaries, family milestones and quiet business dinners. Book 48 hours ahead; a ₹2,000 advance holds the room (adjusted against your bill).
				</p>
				<a href="/private-dining" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-cocoa-deep">See the Private Dining Room →</a>
			</div>
		</div>
		<div>
			<h2 class="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold">Catering Packages</h2>
			<p class="mt-2 text-muted">Per-person pricing, mock rates for design review. Final quotes depend on venue and date.</p>
			<div class="mt-5 space-y-4">
				{#each cateringPackages as p}
					<article class="relative rounded-3xl border-2 {p.popular ? 'border-gold bg-white shadow-md' : 'border-line bg-white'} p-6 shadow-sm">
						{#if p.popular}<span class="absolute -top-3 right-5 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-cocoa-deep"><Crown size={13} aria-hidden="true" /> Most Booked</span>{/if}
						<div class="flex items-baseline justify-between gap-3">
							<h3 class="font-display text-2xl font-bold">{p.name}</h3>
							<p class="font-display text-2xl font-bold text-maroon">{inr(p.price)} <span class="text-sm font-normal text-muted">{p.unit}</span></p>
						</div>
						<p class="mt-1 text-sm text-muted">{p.desc} · {p.min}</p>
						<ul class="mt-3 space-y-1.5 text-sm">
							{#each p.features as f}<li class="flex gap-2"><Check size={16} class="mt-0.5 shrink-0 text-green-700" aria-hidden="true" />{f}</li>{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-12">
		{#if sent}
			<div class="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><Sparkles size={30} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-2xl font-bold">Enquiry received!</h2>
				<p class="mt-2 text-muted">Thank you, {name}. Our events team will call {phone} within 24 hours about your {pkg} package for {guests} guests on {date}. (Mock form — nothing was actually sent.)</p>
			</div>
		{:else}
			<form
				class="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<h2 class="font-display text-2xl font-bold">Request a catering quote</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="cat-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
						<input id="cat-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="cat-phone" class="mb-1.5 block text-sm font-bold">Mobile (10-digit) *</label>
						<input id="cat-phone" bind:value={phone} required inputmode="tel" autocomplete="tel" placeholder="98XXX XXXXX" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="cat-date" class="mb-1.5 block text-sm font-bold">Event date *</label>
						<input id="cat-date" type="date" bind:value={date} required class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="cat-guests" class="mb-1.5 block text-sm font-bold">Guests (approx.)</label>
						<input id="cat-guests" type="number" min="20" max="500" bind:value={guests} class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
				</div>
				<div class="mt-4">
					<label for="cat-pkg" class="mb-1.5 block text-sm font-bold">Package</label>
					<select id="cat-pkg" bind:value={pkg} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none">
						{#each cateringPackages as p}<option value={p.name}>{p.name} — {inr(p.price)} per person</option>{/each}
					</select>
				</div>
				{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Request My Quote</button>
			</form>
		{/if}
	</div>
</section>
