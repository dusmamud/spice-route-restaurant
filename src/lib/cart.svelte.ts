// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, dish cards and /order share one
// live cart. Prices in INR; GST 5% on food; delivery free above ₹499.
import { dishes } from '#lib/data/site.ts';

export type CartLine = { name: string; price: number; qty: number };

const lines = $state<CartLine[]>([]);

export const cart = {
	get lines() {
		return lines;
	},
	get count() {
		return lines.reduce((a, l) => a + l.qty, 0);
	},
	get subtotal() {
		return lines.reduce((a, l) => a + l.qty * l.price, 0);
	},
	get gst() {
		return Math.round(this.subtotal * 0.05);
	},
	get deliveryFee() {
		if (this.subtotal === 0) return 0;
		return this.subtotal >= 499 ? 0 : 40;
	},
	get total() {
		return this.subtotal + this.gst + this.deliveryFee;
	},
	get lastAdded() {
		return lines.length ? lines[lines.length - 1].name : '';
	}
};

export function addToOrder(name: string, price: number) {
	const line = lines.find((l) => l.name === name);
	if (line) line.qty += 1;
	else lines.push({ name, price, qty: 1 });
}

export function setQty(name: string, qty: number) {
	const line = lines.find((l) => l.name === name);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
}

export function removeLine(name: string) {
	const i = lines.findIndex((l) => l.name === name);
	if (i >= 0) lines.splice(i, 1);
}

export function clearCart() {
	lines.splice(0, lines.length);
}

export function addMenuItem(name: string) {
	const item = dishes.find((m) => m.name === name);
	if (item) addToOrder(item.name, item.price);
}
