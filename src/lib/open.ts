// "Open now" status, computed from the real service windows:
// lunch 11:30 AM–3:30 PM, dinner 7:00–11:00 PM, every day.
// Pure function of a Date so it is easy to test and to re-check on a timer.
export type OpenStatus = { open: boolean; label: string; detail: string };

const LUNCH: [number, number] = [11 * 60 + 30, 15 * 60 + 30];
const DINNER: [number, number] = [19 * 60, 23 * 60];

function fmt(mins: number) {
	const h24 = Math.floor(mins / 60);
	const m = mins % 60;
	const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
	const ampm = h24 < 12 ? 'AM' : 'PM';
	return m === 0 ? `${h12} ${ampm}` : `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function openStatus(now = new Date()): OpenStatus {
	const mins = now.getHours() * 60 + now.getMinutes();
	if (mins >= LUNCH[0] && mins < LUNCH[1])
		return { open: true, label: 'Open now', detail: `Lunch service till ${fmt(LUNCH[1])}` };
	if (mins >= DINNER[0] && mins < DINNER[1])
		return { open: true, label: 'Open now', detail: `Dinner service till ${fmt(DINNER[1])}` };
	if (mins < LUNCH[0])
		return { open: false, label: 'Closed now', detail: `Opens today at ${fmt(LUNCH[0])}` };
	if (mins < DINNER[0])
		return { open: false, label: 'Closed now', detail: `Dinner from ${fmt(DINNER[0])} — kitchen break` };
	return { open: false, label: 'Closed now', detail: `Opens tomorrow at ${fmt(LUNCH[0])}` };
}
