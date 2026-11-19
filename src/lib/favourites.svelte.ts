// Saved favourite dishes, persisted in localStorage so a refresh keeps them.
// Frontend only — no account, no server.
const KEY = 'spiceroute-favourites-v1';

function load(): string[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
	} catch {
		return [];
	}
}

const ids = $state<string[]>(load());

function save() {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(KEY, JSON.stringify(ids));
	} catch {
		// Storage full or unavailable — favourites just stay in memory.
	}
}

export const favourites = {
	get ids() {
		return ids;
	},
	get count() {
		return ids.length;
	},
	has(id: string) {
		return ids.includes(id);
	},
	toggle(id: string) {
		const i = ids.indexOf(id);
		if (i >= 0) ids.splice(i, 1);
		else ids.push(id);
		save();
	}
};
