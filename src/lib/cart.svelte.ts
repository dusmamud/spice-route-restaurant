// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, dish cards and /order share one
// live cart. Prices in INR; GST 5% on food; delivery free above ₹499.
// The cart persists in localStorage so a refresh does not clear it.
import { dishes } from '#lib/data/site.ts';

export type CartLine = { name: string; price: number; qty: number };

const STORAGE_KEY = 'spiceroute-cart-v1';

function loadLines(): CartLine[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((l) => l && typeof l.name === 'string' && typeof l.price === 'number' && typeof l.qty === 'number')
			.map((l) => ({ name: l.name, price: l.price, qty: Math.min(9, Math.max(1, l.qty)) }));
	} catch {
		return [];
	}
}

function saveLines() {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
	} catch {
		// Storage unavailable — the cart just lives in memory for this visit.
	}
}

const lines = $state<CartLine[]>(loadLines());

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
	saveLines();
}

export function setQty(name: string, qty: number) {
	const line = lines.find((l) => l.name === name);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
	saveLines();
}

export function removeLine(name: string) {
	const i = lines.findIndex((l) => l.name === name);
	if (i >= 0) lines.splice(i, 1);
	saveLines();
}

export function clearCart() {
	lines.splice(0, lines.length);
	saveLines();
}

export function addMenuItem(name: string) {
	const item = dishes.find((m) => m.name === name);
	if (item) addToOrder(item.name, item.price);
}
