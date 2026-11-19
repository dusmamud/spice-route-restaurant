<script lang="ts">
	import { ArrowRight, Check, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { inr, setMenus, site } from '#lib/data/site.ts';

	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let guests = $state(12);
	let occasion = $state('Birthday');
	let sent = $state(false);
	let ref = $state('');
	let formError = $state('');

	const today = new Date().toISOString().slice(0, 10);
	const sampleMenu = setMenus[0];

	function submit() {
		if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, '')) || !date) {
			formError = 'Please enter your name, a valid 10-digit mobile number, and a date.';
			return;
		}
		if (guests < 6 || guests > 12) {
			formError = 'The private dining room seats 6 to 12 guests. For larger parties, see our catering packages.';
			return;
		}
		formError = '';
		ref = `SR-PD${Math.floor(1000 + Math.random() * 9000)}`;
		sent = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="Private Dining — SpiceRoute Restaurant & Bistro"
	description="SpiceRoute’s private dining room in Bandra West: 12 seats around one long table, set menus from ₹1,999, a dedicated server and a ₹2,000 advance. Enquire now."
	path="/private-dining"
	image="private-dining"
/>

<PageHero eyebrow="Private Dining" title="Twelve Seats," script="One Long Table" desc="Our private dining room — for the birthdays, anniversaries and deals that deserve a room of their own." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2">
		<div>
			<Picture name="private-dining" alt="Private dining room with a long wooden table set for twelve" width={1920} height={1280} sizes="(min-width: 1024px) 50vw, 100vw" eager={true} imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl" />
			<div class="mt-6 grid gap-4 sm:grid-cols-3">
				<div class="rounded-3xl border border-line bg-white p-5">
					<p class="flex items-center gap-2 font-display text-lg font-bold"><Users size={20} class="text-maroon" aria-hidden="true" /> 12 seats</p>
					<p class="mt-1 text-sm text-muted">6 to 12 guests around one long table, with a dedicated server.</p>
				</div>
				<div class="rounded-3xl border border-line bg-white p-5">
					<p class="font-display text-lg font-bold">₹2,000 advance</p>
					<p class="mt-1 text-sm text-muted">Adjustable against your bill. No minimum spend on weekdays.</p>
				</div>
				<div class="rounded-3xl border border-line bg-white p-5">
					<p class="font-display text-lg font-bold">Set menus</p>
					<p class="mt-1 text-sm text-muted">From {inr(1999)} per person, chosen with our chef — plus a tasting session.</p>
				</div>
			</div>
			<div class="mt-6 rounded-3xl bg-white p-6 shadow-sm">
				<h2 class="font-display text-xl font-bold">A Sample Evening — {sampleMenu.name}</h2>
				<ol class="mt-3 space-y-2">
					{#each sampleMenu.courses as course, j}
						<li class="flex gap-3 text-sm"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-pale text-xs font-bold text-cocoa">{j + 1}</span><span class="font-medium">{course}</span></li>
					{/each}
				</ol>
				<p class="mt-4 text-sm text-muted">{inr(sampleMenu.price)} per person · <a href="/set-menus" class="font-bold text-maroon underline underline-offset-2">See all set menus →</a></p>
			</div>
		</div>

		{#if sent}
			<div class="h-fit rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={32} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-2xl font-bold">Enquiry Received!</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">Thank you, {name}. Your private dining enquiry ({ref}) for {guests} guests on {date} is with our events team — we’ll call {phone} within 24 hours to confirm the menu and the ₹2,000 advance. This is a mock enquiry — nothing was booked.</p>
				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<a href="/reservations?room=private" class="flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 font-bold text-cocoa-deep">Book the Room Now <ArrowRight size={18} aria-hidden="true" /></a>
					<button type="button" onclick={() => (sent = false)} class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">New Enquiry</button>
				</div>
			</div>
		{:else}
			<form
				class="h-fit rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<h2 class="font-display text-2xl font-bold">Enquire About the Room</h2>
				<p class="mt-1 text-sm text-muted">Tell us the date and the occasion — we’ll call you back within 24 hours.</p>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="pd-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
						<input id="pd-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="pd-phone" class="mb-1.5 block text-sm font-bold">Mobile (10-digit) *</label>
						<input id="pd-phone" bind:value={phone} required inputmode="tel" autocomplete="tel" placeholder="98XXX XXXXX" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
				</div>
				<div class="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="pd-date" class="mb-1.5 block text-sm font-bold">Preferred date *</label>
						<input id="pd-date" type="date" bind:value={date} min={today} required class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="pd-guests" class="mb-1.5 block text-sm font-bold">Guests (6–12) *</label>
						<input id="pd-guests" type="number" bind:value={guests} min="6" max="12" required class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
				</div>
				<div class="mt-4">
					<label for="pd-occasion" class="mb-1.5 block text-sm font-bold">Occasion</label>
					<select id="pd-occasion" bind:value={occasion} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none">
						<option>Birthday</option>
						<option>Anniversary</option>
						<option>Family celebration</option>
						<option>Business dinner</option>
						<option>Proposal</option>
						<option>Just dinner</option>
					</select>
				</div>
				{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Send Enquiry</button>
				<p class="mt-3 text-center text-xs text-muted">Prefer to book directly? <a href="/reservations?room=private" class="font-bold text-maroon underline underline-offset-2">Reserve the room →</a> · or call {site.phoneDisplay}</p>
			</form>
		{/if}
	</div>
</section>
