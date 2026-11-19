<script lang="ts">
	import { Check, Gift, Mail } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { giftCardDenominations, inr } from '#lib/data/site.ts';

	let amount = $state(1000);
	let customAmount = $state('');
	let recipient = $state('');
	let sender = $state('');
	let message = $state('');
	let deliveryDate = $state('');
	let email = $state('');
	let sent = $state(false);
	let code = $state('');
	let formError = $state('');

	const chosen = $derived(customAmount.trim() ? parseInt(customAmount, 10) || 0 : amount);

	function submit() {
		if (!recipient.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
			formError = 'Please enter the recipient’s name and a valid email address.';
			return;
		}
		if (!chosen || chosen < 500) {
			formError = 'Gift cards start at ₹500 — pick a denomination or enter a custom amount of ₹500 or more.';
			return;
		}
		formError = '';
		code = `SR-GIFT-${Math.floor(1000 + Math.random() * 9000)}`;
		sent = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="Gift Cards — SpiceRoute Restaurant & Bistro"
	description="Send a SpiceRoute gift card — ₹500 to ₹5,000 or any custom amount. Digital delivery, valid at the restaurant and online, never expires."
	path="/gift-cards"
	image="gift-card"
/>

<PageHero eyebrow="Gift Cards" title="Give the Gift" script="of Good Food" desc="A SpiceRoute gift card works at the table and online — for birthdays, anniversaries, and every thank-you in between." />

{#if sent}
	<section class="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
		<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={40} aria-hidden="true" /></span>
		<h2 class="mt-5 font-display text-3xl font-bold">Gift Card Ready!</h2>
		<p class="mt-2 text-muted">A {inr(chosen)} gift card for {recipient} is on its way to {email}.</p>
		<div class="mt-6 rounded-3xl border border-line bg-cocoa-deep p-8 text-white shadow-sm">
			<p class="text-xs font-bold tracking-[0.28em] text-gold-soft uppercase">SpiceRoute Gift Card</p>
			<p class="mt-3 font-display text-5xl font-bold">{inr(chosen)}</p>
			<p class="mt-3 font-mono text-lg tracking-[0.2em]">{code}</p>
			<p class="mt-2 text-sm text-white/70">Valid at the restaurant and online · Never expires</p>
		</div>
		<p class="mt-4 text-sm text-muted">This is a mock gift card — no payment was taken. In the real flow, the e-gift would arrive by email on the chosen date.</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<button type="button" onclick={() => (sent = false)} class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Send Another</button>
			<a href="/menu" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Browse the Menu</a>
		</div>
	</section>
{:else}
	<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-2">
			<div>
				<Picture name="gift-card" alt="Elegant SpiceRoute gift card on a linen tablecloth with a brass diya and rose petals" width={1920} height={1280} sizes="(min-width: 1024px) 50vw, 100vw" eager={true} imgClass="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl" />
				<div class="mt-6 grid gap-4 sm:grid-cols-3">
					<div class="rounded-3xl border border-line bg-white p-5">
						<p class="font-display text-lg font-bold">Digital, 3× loved</p>
						<p class="mt-1 text-sm text-muted">E-gifts outsell physical cards 3:1 — delivered by email, scheduled to any date.</p>
					</div>
					<div class="rounded-3xl border border-line bg-white p-5">
						<p class="font-display text-lg font-bold">Never expires</p>
						<p class="mt-1 text-sm text-muted">No expiry, no hidden fees, no small print. Redeemable dine-in and online.</p>
					</div>
					<div class="rounded-3xl border border-line bg-white p-5">
						<p class="font-display text-lg font-bold">Spends more</p>
						<p class="mt-1 text-sm text-muted">Guests typically spend ₹200–400 above the card’s value. Good for them, good for us.</p>
					</div>
				</div>
				<div class="mt-6 rounded-3xl bg-gold-pale p-6">
					<p class="font-display text-xl font-bold">Bonus card offer</p>
					<p class="mt-1 text-sm leading-relaxed text-cocoa">Buy a ₹1,000 gift card and get a ₹200 bonus card for January–March. Corporate and bulk orders (10+ cards) get 5% off — write to <a href="mailto:hello@spiceroute.in" class="font-bold underline underline-offset-2">hello@spiceroute.in</a>.</p>
				</div>
			</div>

			<form
				class="h-fit rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<h2 class="flex items-center gap-2 font-display text-2xl font-bold"><Gift size={24} class="text-maroon" aria-hidden="true" /> Send an E-Gift Card</h2>
				<fieldset class="mt-5">
					<legend class="text-sm font-bold">Choose an amount</legend>
					<div class="mt-3 grid grid-cols-4 gap-2" role="group" aria-label="Gift card amount">
						{#each giftCardDenominations as d}
							<button type="button" onclick={() => { amount = d; customAmount = ''; }} aria-pressed={amount === d && !customAmount} class="flex min-h-12 items-center justify-center rounded-2xl border-2 text-sm font-bold transition-colors duration-200 {amount === d && !customAmount ? 'border-gold bg-gold-pale' : 'border-line hover:border-gold'}">{inr(d)}</button>
						{/each}
					</div>
					<label for="gc-custom" class="mt-3 block text-sm font-bold">Or a custom amount (₹500+)</label>
					<input id="gc-custom" bind:value={customAmount} inputmode="numeric" placeholder="e.g. 1500" class="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</fieldset>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="gc-recipient" class="mb-1.5 block text-sm font-bold">Recipient’s name *</label>
						<input id="gc-recipient" bind:value={recipient} required placeholder="e.g. Priya Nair" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="gc-email" class="mb-1.5 block text-sm font-bold">Recipient’s email *</label>
						<input id="gc-email" bind:value={email} required type="email" placeholder="priya@example.com" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
				</div>
				<div class="mt-4">
					<label for="gc-sender" class="mb-1.5 block text-sm font-bold">Your name (optional)</label>
					<input id="gc-sender" bind:value={sender} placeholder="Who is it from?" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				<div class="mt-4">
					<label for="gc-message" class="mb-1.5 block text-sm font-bold">A message (optional)</label>
					<textarea id="gc-message" bind:value={message} rows="2" placeholder="Happy birthday — dinner’s on us!" class="w-full rounded-2xl border border-line bg-cream px-4 py-3 focus:border-gold focus:outline-none"></textarea>
				</div>
				<div class="mt-4">
					<label for="gc-date" class="mb-1.5 block text-sm font-bold">Deliver on (optional — leave blank to send now)</label>
					<input id="gc-date" type="date" bind:value={deliveryDate} min={new Date().toISOString().slice(0, 10)} class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
				<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.01]">
					<Mail size={18} aria-hidden="true" /> Send Gift Card · {inr(chosen || 0)}
				</button>
				<p class="mt-3 text-center text-xs text-muted">Mock checkout — no payment is taken. Redeem in-store or with code {`SR-GIFT-XXXX`} at online checkout.</p>
			</form>
		</div>
	</section>
{/if}
