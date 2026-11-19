<script lang="ts">
	import { Minus, Plus, ShoppingBag, Trash2, X } from '@lucide/svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { inr } from '#lib/data/site.ts';

	let { open = $bindable(false) }: { open: boolean } = $props();
</script>

{#if open}
	<div class="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your order">
		<button type="button" aria-label="Close cart" onclick={() => (open = false)} class="absolute inset-0 bg-cocoa-deep/60 backdrop-blur-[2px]"></button>
		<aside class="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
			<div class="flex items-center justify-between border-b border-line bg-cocoa-deep px-5 py-4 text-white">
				<h2 class="flex items-center gap-2 font-display text-xl font-bold">
					<ShoppingBag size={22} aria-hidden="true" /> Your Order
					{#if cart.count > 0}<span class="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-cocoa-deep">{cart.count}</span>{/if}
				</h2>
				<button type="button" onclick={() => (open = false)} aria-label="Close cart" class="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/10">
					<X size={24} aria-hidden="true" />
				</button>
			</div>

			{#if cart.lines.length === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
					<ShoppingBag size={56} class="text-muted" aria-hidden="true" />
					<p class="font-display text-2xl font-bold">Your cart is empty</p>
					<p class="text-sm text-muted">Add a biryani, a pasta, or a lava cake to get started.</p>
					<a href="/menu" onclick={() => (open = false)} class="flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-cocoa-deep">Browse the Menu</a>
				</div>
			{:else}
				<ul class="flex-1 divide-y divide-line overflow-y-auto px-5">
					{#each cart.lines as line (line.name)}
						<li class="flex items-center gap-3 py-4">
							<div class="min-w-0 flex-1">
								<p class="truncate font-semibold">{line.name}</p>
								<p class="text-sm text-muted">{inr(line.price)} each</p>
							</div>
							<div class="flex items-center gap-1 rounded-full border border-line bg-white">
								<button type="button" onclick={() => setQty(line.name, line.qty - 1)} aria-label="Decrease quantity of {line.name}" class="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep"><Minus size={16} aria-hidden="true" /></button>
								<span class="w-6 text-center font-bold" aria-label="Quantity {line.qty}">{line.qty}</span>
								<button type="button" onclick={() => setQty(line.name, line.qty + 1)} aria-label="Increase quantity of {line.name}" class="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-deep"><Plus size={16} aria-hidden="true" /></button>
							</div>
							<p class="w-16 text-right font-bold">{inr(line.price * line.qty)}</p>
							<button type="button" onclick={() => removeLine(line.name)} aria-label="Remove {line.name} from order" class="flex h-11 w-11 items-center justify-center rounded-full text-red-800 hover:bg-red-50"><Trash2 size={18} aria-hidden="true" /></button>
						</li>
					{/each}
				</ul>
				<div class="space-y-2 border-t border-line bg-white px-5 py-4 text-sm">
					<p class="flex justify-between"><span>Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span>GST (5%)</span><span class="font-semibold">{inr(cart.gst)}</span></p>
					<p class="flex justify-between">
						<span>Delivery</span>
						<span class="font-semibold">{cart.deliveryFee === 0 ? 'FREE' : inr(cart.deliveryFee)}</span>
					</p>
					{#if cart.subtotal < 499}
						<p class="rounded-xl bg-gold-pale px-3 py-2 text-xs font-semibold text-cocoa">Add {inr(499 - cart.subtotal)} more for free delivery</p>
					{/if}
					<p class="flex justify-between border-t border-line pt-2 font-display text-lg font-bold"><span>Total</span><span>{inr(cart.total)}</span></p>
					<div class="flex gap-2 pt-1">
						<button type="button" onclick={clearCart} class="flex min-h-12 flex-1 items-center justify-center rounded-full border-2 border-line font-bold text-muted">Clear</button>
						<a href="/order" onclick={() => (open = false)} class="flex min-h-12 flex-[2] items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Checkout →</a>
					</div>
				</div>
			{/if}
		</aside>
	</div>
{/if}
