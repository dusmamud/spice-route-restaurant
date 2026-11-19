// Mock order persistence — the last order + recent orders live in
// localStorage so /track-order can look them up after a refresh.
// No server, no payment; refs are deterministic mock references.
export type PlacedOrderItem = { name: string; price: number; qty: number };
export type PlacedOrder = {
	ref: string;
	mode: 'delivery' | 'pickup';
	name: string;
	phone: string;
	address: string;
	payment: string;
	total: number;
	items: PlacedOrderItem[];
	eta: string;
	placedAt: number;
	promo?: string;
	discount?: number;
};

const LAST_KEY = 'spiceroute-last-order-v1';
const RECENT_KEY = 'spiceroute-recent-orders-v1';

function read<T>(key: string, fallback: T): T {
	if (typeof localStorage === 'undefined') return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function write(key: string, value: unknown) {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage unavailable — tracking just stays in memory for this visit.
	}
}

export function saveLastOrder(order: PlacedOrder) {
	write(LAST_KEY, order);
	const recent = read<PlacedOrder[]>(RECENT_KEY, []);
	const next = [order, ...recent.filter((o) => o.ref !== order.ref)].slice(0, 3);
	write(RECENT_KEY, next);
}

export function getLastOrder(): PlacedOrder | null {
	return read<PlacedOrder | null>(LAST_KEY, null);
}

export function getRecentOrders(): PlacedOrder[] {
	return read<PlacedOrder[]>(RECENT_KEY, []);
}

export function clearLastOrder() {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.removeItem(LAST_KEY);
	} catch {
		// ignore
	}
}

// Deterministic mock status for any ref: hash the ref so the same ref
// always shows the same step. Steps: 0 Confirmed, 1 Preparing, 2 On the way, 3 Delivered.
export const orderSteps = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];

export function statusForRef(ref: string): { step: number; updatedAgo: string } {
	let h = 0;
	for (let i = 0; i < ref.length; i++) h = (h * 31 + ref.charCodeAt(i)) % 997;
	const step = 1 + (h % 3); // a placed order is at least "Preparing"
	const ago = 4 + (h % 26);
	return { step, updatedAgo: `${ago} min ago` };
}
