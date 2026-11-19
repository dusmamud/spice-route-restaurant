<script lang="ts">
	import { Bike, Check, Clock, PackageSearch, Store } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { getLastOrder, orderSteps, statusForRef, type PlacedOrder } from '#lib/orders.ts';
	import { inr } from '#lib/data/site.ts';
	import { page } from '$app/state';

	let ref = $state('');
	let lookedUp = $state<PlacedOrder | null>(null);
	let error = $state('');
	let last = $state<PlacedOrder | null>(null);

	$effect(() => {
		last = getLastOrder();
		const q = page.url.searchParams.get('ref');
		if (q) {
			ref = q;
			lookup(q);
		}
	});

	function lookup(r: string) {
		const code = r.trim().toUpperCase();
		if (!/^SR\d{6}$/.test(code)) {
			error = 'Enter a reference like SR123456 — it’s on your order confirmation.';
			lookedUp = null;
			return;
		}
		error = '';
		const saved = getLastOrder();
		if (saved && saved.ref === code) {
			lookedUp = saved;
			return;
		}
		// Mock lookup for any well-formed ref: deterministic status from the ref itself.
		lookedUp = {
			ref: code,
			mode: 'delivery',
			name: 'Guest',
			phone: '',
			address: '',
			payment: 'UPI',
			total: 0,
			items: [],
			eta: '35–45 min',
			placedAt: Date.now()
		};
	}

	const status = $derived(lookedUp ? statusForRef(lookedUp.ref) : null);
	const stepNotes = [
		'We’ve got your order.',
		'The kitchen is on it — fresh, to order.',
		'Your food has left the restaurant.',
		'Enjoy! Tell us how it was.'
	];
</script>

<Seo
	title="Track Your Order — SpiceRoute Restaurant & Bistro"
	description="Track your SpiceRoute delivery or pickup live: Confirmed → Preparing → On the way → Delivered. Enter your order reference (SR123456)."
	path="/track-order"
	image="hero-biryani"
/>

<PageHero eyebrow="Order Tracking" title="Where's My" script="Food?" desc="Enter your order reference — it’s on your confirmation — and see exactly where your biryani is." />

<section class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
	<form
		class="rounded-3xl border border-line bg-white p-6 shadow-sm"
		onsubmit={(e) => {
			e.preventDefault();
			lookup(ref);
		}}
	>
		<label for="track-ref" class="mb-1.5 block text-sm font-bold">Order reference</label>
		<div class="flex gap-2">
			<input id="track-ref" bind:value={ref} placeholder="e.g. SR123456" autocomplete="off" class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-5 font-mono uppercase focus:border-gold focus:outline-none" />
			<button type="submit" class="flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 font-bold text-cocoa-deep"><PackageSearch size={18} aria-hidden="true" /> Track</button>
		</div>
		{#if error}<p class="mt-3 text-sm font-semibold text-red-800" role="alert">{error}</p>{/if}
		{#if last}
			<p class="mt-3 text-sm text-muted">
				Your most recent order: <button type="button" onclick={() => lookup(last!.ref)} class="font-bold text-maroon underline underline-offset-2">{last.ref}</button> · {last.items.map((i) => i.name).join(', ')}
			</p>
		{/if}
		<p class="mt-3 text-xs text-muted">Try any reference like SR123456 — this is a mock tracker; statuses are simulated for design review.</p>
	</form>

	{#if lookedUp && status}
		<div class="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div>
					<p class="text-xs font-bold tracking-[0.28em] text-maroon uppercase">Order {lookedUp.ref}</p>
					<h2 class="mt-1 font-display text-2xl font-bold">{orderSteps[status.step]}</h2>
					<p class="mt-1 flex items-center gap-1.5 text-sm text-muted"><Clock size={15} aria-hidden="true" /> Updated {status.updatedAgo} · ETA {lookedUp.eta}</p>
				</div>
				<span class="flex items-center gap-2 rounded-full bg-gold-pale px-4 py-2 text-sm font-bold text-cocoa">
					{#if lookedUp.mode === 'delivery'}<Bike size={16} aria-hidden="true" /> Delivery{:else}<Store size={16} aria-hidden="true" /> Pickup{/if}
				</span>
			</div>
			<ol class="mt-6" aria-label="Order status">
				{#each orderSteps as s, i}
					<li class="relative flex gap-4 pb-6 last:pb-0">
						<span class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full {i <= status.step ? 'bg-gold text-cocoa-deep' : 'border-2 border-line bg-white text-muted'}">
							{#if i < status.step}<Check size={18} aria-hidden="true" />{:else}<span class="text-sm font-bold">{i + 1}</span>{/if}
						</span>
						{#if i < orderSteps.length - 1}<span class="absolute top-9 left-[17px] h-[calc(100%-2rem)] w-0.5 {i < status.step ? 'bg-gold' : 'bg-line'}" aria-hidden="true"></span>{/if}
						<span class="pt-1.5">
							<span class="block font-bold {i <= status.step ? '' : 'text-muted'}">{s}</span>
							<span class="text-sm text-muted">{stepNotes[i]}</span>
						</span>
					</li>
				{/each}
			</ol>
			{#if lookedUp.items.length > 0}
				<div class="mt-2 space-y-2 border-t border-line pt-4 text-sm">
					{#each lookedUp.items as item}
						<p class="flex justify-between"><span>{item.qty} × {item.name}</span><span class="font-semibold">{inr(item.price * item.qty)}</span></p>
					{/each}
					{#if lookedUp.discount}<p class="flex justify-between text-green-700"><span>Promo {lookedUp.promo ?? ''}</span><span class="font-semibold">− {inr(lookedUp.discount)}</span></p>{/if}
					<p class="flex justify-between border-t border-line pt-2 font-display text-lg font-bold"><span>Total</span><span>{inr(lookedUp.total)}</span></p>
				</div>
			{/if}
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/order" class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Order Again</a>
				<a href="/contact" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Need Help? Contact Us</a>
			</div>
		</div>
	{/if}
</section>
