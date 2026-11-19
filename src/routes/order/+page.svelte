<script lang="ts">
	import { Bike, Check, Clock, Heart, Minus, Plus, RotateCcw, ShoppingBag, Store, Trash2 } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { addToOrder, cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { favourites } from '#lib/favourites.svelte.ts';
	import { getRecentOrders, saveLastOrder, type PlacedOrder } from '#lib/orders.ts';
	import { dishes, inr, promoCodes, site, type PromoCode } from '#lib/data/site.ts';

	type Step = 1 | 2 | 3;
	let step = $state<Step>(1);
	let mode = $state<'delivery' | 'pickup'>('delivery');
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let notes = $state('');
	let payment = $state<'UPI' | 'Card' | 'COD'>('UPI');
	let orderRef = $state('');
	let eta = $state('');
	let formError = $state('');
	let promoInput = $state('');
	let appliedPromo = $state<PromoCode | null>(null);
	let promoError = $state('');
	let recent = $state<PlacedOrder[]>([]);
	let reorderNote = $state('');

	$effect(() => {
		recent = getRecentOrders();
	});

	const popular = [...dishes].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);
	const favDishes = $derived(dishes.filter((d) => favourites.has(d.id)));

	const discount = $derived.by(() => {
		if (!appliedPromo) return 0;
		if (appliedPromo.type === 'flat') return Math.min(appliedPromo.value, cart.subtotal);
		const pct = Math.round((cart.subtotal * appliedPromo.value) / 100);
		return Math.min(pct, appliedPromo.cap ?? pct);
	});
	const taxable = $derived(cart.subtotal - discount);
	const gst = $derived(Math.round(taxable * 0.05));
	const deliveryFee = $derived(mode === 'delivery' ? cart.deliveryFee : 0);
	const total = $derived(taxable + gst + deliveryFee);

	function applyPromo() {
		const code = promoInput.trim().toUpperCase();
		const found = promoCodes.find((p) => p.code === code);
		if (!found) {
			promoError = 'That code is not valid. Try FEAST20, SWEET999, LUNCH299 or BDAYCAKE.';
			return;
		}
		if (cart.subtotal < found.minOrder) {
			promoError = `${found.code} needs a minimum order of ${inr(found.minOrder)}.`;
			return;
		}
		appliedPromo = found;
		promoError = '';
	}

	function reorder(order: PlacedOrder) {
		for (const item of order.items) for (let i = 0; i < item.qty; i++) addToOrder(item.name, item.price);
		reorderNote = `${order.items.length} item${order.items.length === 1 ? '' : 's'} from order ${order.ref} added to your cart.`;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function placeOrder() {
		if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
			formError = 'Please enter your name and a valid 10-digit Indian mobile number.';
			return;
		}
		if (mode === 'delivery' && address.trim().length < 10) {
			formError = 'Please enter a full delivery address (house, street, area).';
			return;
		}
		formError = '';
		orderRef = `SR${Math.floor(100000 + Math.random() * 900000)}`;
		eta = mode === 'delivery' ? '35–45 min' : '20 min';
		saveLastOrder({
			ref: orderRef,
			mode,
			name,
			phone,
			address,
			payment,
			total,
			items: cart.lines.map((l) => ({ name: l.name, price: l.price, qty: l.qty })),
			eta,
			placedAt: Date.now(),
			promo: appliedPromo?.code,
			discount
		});
		step = 3;
		clearCart();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="Order Online — SpiceRoute Restaurant & Bistro"
	description="Order biryani, butter chicken, pastas, noodles and desserts online from SpiceRoute, Bandra West. Free delivery over ₹499, UPI / card / COD, 35–45 min delivery."
	path="/order"
	image="hero-biryani"
/>

<PageHero eyebrow="Order Online" title="Good Food," script="Delivered Hot" desc="Order from the full SpiceRoute menu. Free delivery on orders of ₹499 and above. GST of 5% applies on food." />

{#if step === 3}
	<section class="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
		<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={40} aria-hidden="true" /></span>
		<h2 class="mt-5 font-display text-3xl font-bold">Order Confirmed!</h2>
		<p class="mt-2 text-muted">Thank you, {name}. Your food is being prepared fresh.</p>
		<div class="mt-6 rounded-3xl border border-line bg-white p-6 text-left shadow-sm">
			<p class="flex justify-between py-1.5"><span class="text-muted">Order reference</span><span class="font-bold">{orderRef}</span></p>
			<p class="flex justify-between py-1.5"><span class="text-muted">Mode</span><span class="font-bold">{mode === 'delivery' ? 'Delivery' : 'Pickup'}</span></p>
			<p class="flex justify-between py-1.5"><span class="text-muted">Payment</span><span class="font-bold">{payment}{payment === 'COD' ? ' (Cash on Delivery)' : ''}</span></p>
			<p class="flex justify-between py-1.5"><span class="text-muted">Estimated time</span><span class="font-bold">{eta}</span></p>
			{#if appliedPromo}<p class="flex justify-between py-1.5"><span class="text-muted">Promo {appliedPromo.code}</span><span class="font-bold text-green-700">− {inr(discount)}</span></p>{/if}
			{#if mode === 'delivery'}<p class="flex justify-between py-1.5"><span class="text-muted">Deliver to</span><span class="max-w-[60%] text-right font-bold">{address}</span></p>{/if}
		</div>
		<ol class="mt-6 grid grid-cols-4 gap-2 text-xs font-semibold" aria-label="Order status">
			{#each ['Confirmed', 'Preparing', 'On the way', 'Delivered'] as s, i}
				<li class="rounded-2xl px-2 py-3 {i === 0 ? 'bg-gold text-cocoa-deep' : 'bg-white text-muted border border-line'}">{s}</li>
			{/each}
		</ol>
		<p class="mt-4 text-sm text-muted">This is a mock checkout — no payment was taken and no real order was placed. We will call {phone} if we need anything.</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a href="/track-order?ref={orderRef}" class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Track Your Order →</a>
			<a href="/menu" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Order More</a>
			<a href="/" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Back to Home</a>
		</div>
	</section>
{:else}
	<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
		<!-- Step indicator -->
		<ol class="mx-auto grid max-w-2xl grid-cols-3 gap-2 text-center text-sm font-bold" aria-label="Checkout steps">
			<li class="rounded-full py-3 {step === 1 ? 'bg-cocoa text-white' : 'bg-white text-muted border border-line'}">1 · Your Cart</li>
			<li class="rounded-full py-3 {step === 2 ? 'bg-cocoa text-white' : 'bg-white text-muted border border-line'}">2 · Details &amp; Payment</li>
			<li class="rounded-full py-3 bg-white text-muted border border-line">3 · Confirmation</li>
		</ol>

		{#if reorderNote}<p class="mx-auto mt-6 max-w-2xl rounded-2xl bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-800" role="status">{reorderNote}</p>{/if}

		{#if step === 1}
			<div class="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
				<div class="min-w-0">
					{#if cart.lines.length === 0}
						<div class="rounded-3xl border border-dashed border-line bg-white p-10 text-center">
							<ShoppingBag size={48} class="mx-auto text-muted" aria-hidden="true" />
							<p class="mt-4 font-display text-2xl font-bold">Your cart is empty</p>
							<p class="mt-2 text-muted">Add something delicious from the menu below.</p>
						</div>
					{:else}
						<ul class="divide-y divide-line rounded-3xl border border-line bg-white px-5">
							{#each cart.lines as line (line.name)}
								<li class="flex items-center gap-3 py-4">
									<div class="min-w-0 flex-1">
										<p class="truncate font-bold">{line.name}</p>
										<p class="text-sm text-muted">{inr(line.price)} each</p>
									</div>
									<div class="flex items-center gap-1 rounded-full border border-line">
										<button type="button" onclick={() => setQty(line.name, line.qty - 1)} aria-label="Decrease quantity of {line.name}" class="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep"><Minus size={16} aria-hidden="true" /></button>
										<span class="w-6 text-center font-bold">{line.qty}</span>
										<button type="button" onclick={() => setQty(line.name, line.qty + 1)} aria-label="Increase quantity of {line.name}" class="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep"><Plus size={16} aria-hidden="true" /></button>
									</div>
									<p class="w-16 text-right font-bold">{inr(line.price * line.qty)}</p>
									<button type="button" onclick={() => removeLine(line.name)} aria-label="Remove {line.name}" class="flex h-11 w-11 items-center justify-center rounded-full text-red-800 hover:bg-red-50"><Trash2 size={18} aria-hidden="true" /></button>
								</li>
							{/each}
						</ul>
					{/if}

					{#if recent.length > 0}
						<h2 class="mt-10 flex items-center gap-2 font-display text-2xl font-bold"><RotateCcw size={22} class="text-maroon" aria-hidden="true" /> Order Again</h2>
						<div class="mt-5 grid gap-4 sm:grid-cols-3">
							{#each recent as o (o.ref)}
								<div class="rounded-3xl border border-line bg-white p-5 shadow-sm">
									<p class="font-bold">{o.ref}</p>
									<p class="mt-1 text-sm text-muted">{o.items.map((i) => `${i.qty} × ${i.name}`).join(', ')}</p>
									<p class="mt-2 font-display text-lg font-bold text-maroon">{inr(o.total)}</p>
									<button type="button" onclick={() => reorder(o)} class="mt-3 flex min-h-11 w-full items-center justify-center rounded-full bg-gold text-sm font-bold text-cocoa-deep">Reorder these</button>
								</div>
							{/each}
						</div>
					{/if}

					{#if favDishes.length > 0}
						<h2 class="mt-10 flex items-center gap-2 font-display text-2xl font-bold"><Heart size={22} class="text-red-700" fill="currentColor" aria-hidden="true" /> Your Favourites</h2>
						<div class="mt-5 grid gap-5 sm:grid-cols-2">
							{#each favDishes.slice(0, 4) as dish (dish.id)}
								<DishCard {dish} />
							{/each}
						</div>
					{/if}

					<h2 class="mt-10 font-display text-2xl font-bold">Popular Right Now</h2>
					<div class="mt-5 grid gap-5 sm:grid-cols-2">
						{#each popular as dish (dish.id)}
							<DishCard {dish} />
						{/each}
					</div>
				</div>
				<aside class="h-fit min-w-0 rounded-3xl border border-line bg-white p-6 shadow-sm lg:sticky lg:top-24">
					<h2 class="font-display text-xl font-bold">Order Summary</h2>
					<div class="mt-4 space-y-2 text-sm">
						<p class="flex justify-between"><span>Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
						{#if appliedPromo}
							<p class="flex justify-between text-green-700"><span>Promo {appliedPromo.code}</span><span class="font-semibold">− {inr(discount)}</span></p>
						{/if}
						<p class="flex justify-between"><span>GST (5%)</span><span class="font-semibold">{inr(gst)}</span></p>
						<p class="flex justify-between"><span>Delivery</span><span class="font-semibold">{cart.subtotal === 0 ? '—' : cart.deliveryFee === 0 ? 'FREE' : inr(cart.deliveryFee)}</span></p>
						{#if cart.subtotal > 0 && cart.subtotal < 499}
							<p class="rounded-xl bg-gold-pale px-3 py-2 text-xs font-semibold text-cocoa">Add {inr(499 - cart.subtotal)} more for free delivery</p>
						{/if}
						<p class="flex justify-between border-t border-line pt-3 font-display text-xl font-bold"><span>Total</span><span>{inr(total)}</span></p>
					</div>

					{#if appliedPromo}
						<p class="mt-4 flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
							<span>{appliedPromo.code} applied — {appliedPromo.desc}</span>
							<button type="button" onclick={() => { appliedPromo = null; promoInput = ''; }} class="font-bold underline underline-offset-2">Remove</button>
						</p>
					{:else}
						<form
							class="mt-4"
							onsubmit={(e) => {
								e.preventDefault();
								applyPromo();
							}}
						>
							<label for="promo-code" class="mb-1.5 block text-sm font-bold">Promo code</label>
							<div class="flex gap-2">
								<input id="promo-code" bind:value={promoInput} placeholder="e.g. FEAST20" autocomplete="off" class="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-cream px-4 uppercase focus:border-gold focus:outline-none" />
								<button type="submit" class="flex min-h-12 items-center rounded-full bg-cocoa px-5 font-bold text-white">Apply</button>
							</div>
							{#if promoError}<p class="mt-2 text-xs font-semibold text-red-800" role="alert">{promoError}</p>{/if}
							<p class="mt-2 text-xs text-muted">Try FEAST20, SWEET999, LUNCH299 or BDAYCAKE — see <a href="/offers" class="font-bold text-maroon underline underline-offset-2">Offers</a>.</p>
						</form>
					{/if}

					<p class="mt-4 flex items-center gap-2 text-xs text-muted"><Clock size={14} aria-hidden="true" /> Delivery in 35–45 min · Pickup in 20 min</p>
					<button type="button" disabled={cart.lines.length === 0} onclick={() => (step = 2)} class="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40">
						Continue to Details →
					</button>
					<p class="mt-3 text-center text-xs text-muted">Delivering to {site.areas.join(', ')}</p>
					<p class="mt-2 text-center text-xs text-muted"><a href="/track-order" class="font-bold text-maroon underline underline-offset-2">Track an existing order →</a></p>
				</aside>
			</div>
		{:else}
			<form
				class="mx-auto mt-8 max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
				onsubmit={(e) => {
					e.preventDefault();
					placeOrder();
				}}
			>
				<h2 class="font-display text-2xl font-bold">Delivery or Pickup?</h2>
				<div class="mt-4 grid grid-cols-2 gap-3" role="group" aria-label="Order mode">
					<button type="button" onclick={() => (mode = 'delivery')} aria-pressed={mode === 'delivery'} class="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl border-2 font-bold transition-colors duration-200 {mode === 'delivery' ? 'border-gold bg-gold-pale' : 'border-line'}">
						<Bike size={22} aria-hidden="true" /> Delivery · 35–45 min
					</button>
					<button type="button" onclick={() => (mode = 'pickup')} aria-pressed={mode === 'pickup'} class="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl border-2 font-bold transition-colors duration-200 {mode === 'pickup' ? 'border-gold bg-gold-pale' : 'border-line'}">
						<Store size={22} aria-hidden="true" /> Pickup · 20 min
					</button>
				</div>

				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="ord-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
						<input id="ord-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
					<div>
						<label for="ord-phone" class="mb-1.5 block text-sm font-bold">Mobile (10-digit) *</label>
						<input id="ord-phone" bind:value={phone} required inputmode="tel" autocomplete="tel" placeholder="98XXX XXXXX" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
					</div>
				</div>
				{#if mode === 'delivery'}
					<div class="mt-4">
						<label for="ord-address" class="mb-1.5 block text-sm font-bold">Delivery address *</label>
						<textarea id="ord-address" bind:value={address} rows="2" placeholder="Flat, building, street, area — e.g. 4B, Sea View Apartments, Linking Road, Bandra West" class="w-full rounded-2xl border border-line bg-cream px-4 py-3 focus:border-gold focus:outline-none"></textarea>
						<p class="mt-2 text-xs text-muted">Delivery zones &amp; fees: Bandra free · Khar / Santacruz / Mahim ₹40 · Juhu ₹40 · Andheri West ₹60. <a href="/contact" class="font-bold text-maroon underline underline-offset-2">See all zones →</a></p>
					</div>
				{/if}
				<div class="mt-4">
					<label for="ord-notes" class="mb-1.5 block text-sm font-bold">Order notes (optional)</label>
					<input id="ord-notes" bind:value={notes} placeholder="Less spicy, Jain preparation, extra raita…" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>

				<fieldset class="mt-6 min-w-0">
					<legend class="text-sm font-bold">Payment method</legend>
					<div class="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Payment method">
						{#each [{ v: 'UPI', label: 'UPI' }, { v: 'Card', label: 'Card' }, { v: 'COD', label: 'Cash on Delivery' }] as p}
							<button type="button" onclick={() => (payment = p.v as 'UPI' | 'Card' | 'COD')} aria-pressed={payment === p.v} class="flex min-h-12 items-center justify-center rounded-2xl border-2 px-2 text-center text-sm font-bold transition-colors duration-200 {payment === p.v ? 'border-gold bg-gold-pale' : 'border-line'}">{p.label}</button>
						{/each}
					</div>
					<p class="mt-2 text-xs text-muted">UPI first — GPay, PhonePe, Paytm. Mock checkout — no real payment is taken.</p>
				</fieldset>

				<div class="mt-6 space-y-2 border-t border-line pt-4 text-sm">
					<p class="flex justify-between"><span>Items ({cart.count})</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					{#if appliedPromo}<p class="flex justify-between text-green-700"><span>Promo {appliedPromo.code}</span><span class="font-semibold">− {inr(discount)}</span></p>{/if}
					<p class="flex justify-between"><span>GST (5%) + {mode === 'delivery' ? (deliveryFee === 0 ? 'free delivery' : 'delivery') : 'pickup'}</span><span class="font-semibold">{inr(gst + deliveryFee)}</span></p>
					<p class="flex justify-between font-display text-xl font-bold"><span>Total to pay</span><span>{inr(total)}</span></p>
				</div>

				{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
				<div class="mt-6 flex gap-3">
					<button type="button" onclick={() => (step = 1)} class="flex min-h-12 flex-1 items-center justify-center rounded-full border-2 border-line font-bold">← Back to Cart</button>
					<button type="submit" class="flex min-h-12 flex-[2] items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Place Order · {inr(total)}</button>
				</div>
			</form>
		{/if}
	</section>
{/if}
