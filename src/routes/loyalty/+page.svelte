<script lang="ts">
	import { Check, Gift, Sparkles, Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { loyaltyTiers } from '#lib/data/site.ts';

	let name = $state('');
	let phone = $state('');
	let joined = $state(false);
	let memberId = $state('');
	let formError = $state('');

	function submit() {
		if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
			formError = 'Please enter your name and a valid 10-digit mobile number.';
			return;
		}
		formError = '';
		memberId = `SR-${Math.floor(10000 + Math.random() * 90000)}`;
		joined = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="SpiceRoute Rewards — Loyalty Programme"
	description="Earn 5% back in SpicePoints on every bill at SpiceRoute, Bandra West. Join free in under 5 seconds, unlock Foodie and Connoisseur tiers, and redeem points on food."
	path="/loyalty"
	image="hero-biryani"
/>

<PageHero eyebrow="SpiceRoute Rewards" title="Eat. Earn." script="Repeat." desc="One clear promise: every rupee you spend comes back as points. Join free in under 5 seconds — no app to download." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-5 md:grid-cols-3">
		{#each [{ icon: Gift, title: '1 · Join free', text: 'Give us your mobile number at the table or below. Your wallet card is ready in seconds — no app, no password.' }, { icon: Sparkles, title: '2 · Earn 5% back', text: 'Every bill earns SpicePoints — 5% back as a Regular, 7% as a Foodie, 10% as a Connoisseur. Points show up instantly.' }, { icon: Star, title: '3 · Redeem on food', text: '100 points = ₹100 off any bill, dine-in or delivery. Your usual is one tap away — we remember it.' }] as s}
			<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><s.icon size={24} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-xl font-bold">{s.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-14 text-center font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Three Tiers, One Promise</h2>
	<div class="mt-8 grid gap-5 lg:grid-cols-3">
		{#each loyaltyTiers as t, i}
			<div class="rounded-3xl border border-line bg-white p-6 shadow-sm {i === 2 ? 'ring-2 ring-gold' : ''}">
				<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">{t.threshold}</p>
				<h3 class="mt-2 font-display text-2xl font-bold">{t.name}{i === 2 ? ' ★' : ''}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{t.perk}</p>
				<p class="mt-4 text-sm font-semibold">{i === 0 ? 'Start here — everyone begins as a Regular.' : i === 1 ? 'Unlocked after ₹10,000 in visits.' : 'Unlocked after ₹25,000 in visits.'}</p>
			</div>
		{/each}
	</div>

	{#if joined}
		<div class="mx-auto mt-12 max-w-2xl rounded-3xl border border-line bg-cocoa-deep p-8 text-center text-white shadow-sm">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-cocoa-deep"><Check size={32} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-3xl font-bold">Welcome to Rewards, {name}!</h2>
			<p class="mt-2 text-white/75">Your member ID is <span class="font-mono font-bold text-gold-soft">{memberId}</span>. Show it at the table or quote it when you order — your 5% starts with your next bill.</p>
			<p class="mt-3 text-sm text-white/60">Mock signup — no account was created. In the real flow, your wallet card would arrive by SMS.</p>
		</div>
	{:else}
		<form
			class="mx-auto mt-12 max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<h2 class="font-display text-2xl font-bold">Join SpiceRoute Rewards — Free</h2>
			<p class="mt-1 text-sm text-muted">Five seconds, one mobile number, and your first 100 bonus points are on us.</p>
			<div class="mt-5 grid gap-4 sm:grid-cols-2">
				<div>
					<label for="loy-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
					<input id="loy-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				<div>
					<label for="loy-phone" class="mb-1.5 block text-sm font-bold">Mobile (10-digit) *</label>
					<input id="loy-phone" bind:value={phone} required inputmode="tel" autocomplete="tel" placeholder="98XXX XXXXX" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
			</div>
			{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
			<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Join Free &amp; Get 100 Bonus Points</button>
			<p class="mt-3 text-center text-xs text-muted">By joining you agree to receive SMS offers from SpiceRoute. Unsubscribe anytime.</p>
		</form>
	{/if}
</section>
