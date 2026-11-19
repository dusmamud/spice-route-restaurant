<script lang="ts">
	import { CalendarCheck, Check, Users, X } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { partySizes, reservationSlots, seatingPreferences, site } from '#lib/data/site.ts';
	import { page } from '$app/state';

	let date = $state('');
	let slot = $state('');
	let party = $state(4);
	let name = $state('');
	let phone = $state('');
	let occasion = $state('Just dinner');
	let seating = $state('No preference');
	let notes = $state('');
	let confirmed = $state(false);
	let cancelled = $state(false);
	let ref = $state('');
	let formError = $state('');
	let alternatives = $state<string[]>([]);

	const today = new Date().toISOString().slice(0, 10);
	const maxDate = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

	// ?room=private from the catering/private-dining pages pre-selects the room.
	$effect(() => {
		if (page.url.searchParams.get('room') === 'private') seating = 'Private dining room';
	});

	function slotMinutes(s: string): number {
		const m = s.match(/^(\d+):(\d+)\s(AM|PM)$/);
		if (!m) return 0;
		let h = parseInt(m[1], 10);
		if (m[3] === 'PM' && h !== 12) h += 12;
		if (m[3] === 'AM' && h === 12) h = 0;
		return h * 60 + parseInt(m[2], 10);
	}

	function slotPast(s: string): boolean {
		if (date !== today) return false;
		const now = new Date();
		return slotMinutes(s) < now.getHours() * 60 + now.getMinutes() + 45;
	}

	// Deterministic mock availability: hash of date+slot decides which slots are full.
	function slotAvailable(s: string): boolean {
		if (!date) return true;
		if (slotPast(s)) return false;
		let h = 0;
		const key = `${date}|${s}`;
		for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 97;
		return h % 5 !== 0;
	}

	function nearestAlternatives(): string[] {
		if (!slot) return [];
		const idx = reservationSlots.indexOf(slot);
		const out: string[] = [];
		for (let d = 1; d < reservationSlots.length && out.length < 2; d++) {
			for (const cand of [reservationSlots[idx + d], reservationSlots[idx - d]]) {
				if (cand && slotAvailable(cand) && !out.includes(cand)) out.push(cand);
			}
		}
		return out;
	}

	function submit() {
		if (!date || !slot || !name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
			formError = 'Please pick a date and time, and enter your name and a valid 10-digit mobile number.';
			return;
		}
		if (slotPast(slot)) {
			formError = 'That time has already passed today — please pick a later slot.';
			alternatives = nearestAlternatives();
			return;
		}
		if (!slotAvailable(slot)) {
			formError = 'That slot just filled up — please pick another time.';
			alternatives = nearestAlternatives();
			return;
		}
		formError = '';
		alternatives = [];
		ref = `SR-T${Math.floor(1000 + Math.random() * 9000)}`;
		confirmed = true;
		cancelled = false;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const whatsappText = $derived(
		`Hi SpiceRoute! I'd like to confirm my table — ${ref}, ${date} at ${slot}, party of ${party} (${occasion}).`
	);
</script>

<Seo
	title="Book a Table — SpiceRoute Restaurant & Bistro"
	description="Reserve a table at SpiceRoute, Bandra West in under a minute. Pick your date, time, party size, seating preference and occasion — confirmed instantly, no advance payment."
	path="/reservations"
	image="dining-room"
/>

<PageHero eyebrow="Reservations" title="Book a Table" script="at SpiceRoute" desc="Reserve your table in under a minute. Parties of 8 or more, and the private dining room, are confirmed by phone within 2 hours." />

{#if confirmed}
	<section class="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
		{#if cancelled}
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-800"><X size={40} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-bold">Booking Cancelled</h2>
			<p class="mt-2 text-muted">Your table for {date} at {slot} ({ref}) has been cancelled. We hope to host you another day.</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<button type="button" onclick={() => { confirmed = false; cancelled = false; }} class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Book a New Table</button>
				<a href="/" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Back to Home</a>
			</div>
		{:else}
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700"><CalendarCheck size={40} aria-hidden="true" /></span>
			<h2 class="mt-5 font-display text-3xl font-bold">Table Reserved!</h2>
			<p class="mt-2 text-muted">We can't wait to host you, {name}.</p>
			<div class="mt-6 rounded-3xl border border-line bg-white p-6 text-left shadow-sm">
				<p class="flex justify-between py-1.5"><span class="text-muted">Booking reference</span><span class="font-bold">{ref}</span></p>
				<p class="flex justify-between py-1.5"><span class="text-muted">Date</span><span class="font-bold">{date}</span></p>
				<p class="flex justify-between py-1.5"><span class="text-muted">Time</span><span class="font-bold">{slot}</span></p>
				<p class="flex justify-between py-1.5"><span class="text-muted">Party size</span><span class="font-bold">{party} guest{party === 1 ? '' : 's'}</span></p>
				<p class="flex justify-between py-1.5"><span class="text-muted">Occasion</span><span class="font-bold">{occasion}</span></p>
				<p class="flex justify-between py-1.5"><span class="text-muted">Seating</span><span class="font-bold">{seating}</span></p>
				{#if notes.trim()}<p class="flex justify-between gap-4 py-1.5"><span class="shrink-0 text-muted">Notes</span><span class="text-right font-bold">{notes}</span></p>{/if}
			</div>
			<p class="mt-4 text-sm text-muted">This is a mock reservation — no real table was booked. A confirmation SMS would go to {phone}. Please arrive within 15 minutes of your slot, or call {site.phoneDisplay}.</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<a href="https://wa.me/919820012345?text={encodeURIComponent(whatsappText)}" target="_blank" rel="noopener" class="flex min-h-12 items-center rounded-full bg-[#25d366] px-7 font-bold text-white">Confirm on WhatsApp</a>
				<a href="/menu" class="flex min-h-12 items-center rounded-full bg-gold px-7 font-bold text-cocoa-deep">Browse the Menu</a>
				<button type="button" onclick={() => { confirmed = false; }} class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Modify Booking</button>
				<button type="button" onclick={() => (cancelled = true)} class="flex min-h-12 items-center rounded-full border-2 border-red-800 px-7 font-bold text-red-800">Cancel Booking</button>
			</div>
		{/if}
	</section>
{:else}
	<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
		<form
			class="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<div class="grid gap-5 sm:grid-cols-2">
				<div>
					<label for="res-date" class="mb-1.5 block text-sm font-bold">Date *</label>
					<input id="res-date" type="date" bind:value={date} min={today} max={maxDate} required class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				<div>
					<label for="res-party" class="mb-1.5 block text-sm font-bold">Party size *</label>
					<div class="relative">
						<Users size={18} class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
						<select id="res-party" bind:value={party} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream py-3 pr-4 pl-11 focus:border-gold focus:outline-none">
							{#each partySizes as n}<option value={n}>{n} guest{n === 1 ? '' : 's'}</option>{/each}
						</select>
					</div>
					<p class="mt-1.5 text-xs text-muted">Parties of 9+ are confirmed by phone within 2 hours.</p>
				</div>
			</div>

			<fieldset class="mt-6 min-w-0">
				<legend class="text-sm font-bold">Time slot *</legend>
				<div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each reservationSlots as s}
						{@const available = slotAvailable(s)}
						{@const past = slotPast(s)}
						<button
							type="button"
							disabled={!available}
							onclick={() => (slot = s)}
							aria-pressed={slot === s}
							aria-label="{s}{available ? '' : past ? ', time has passed' : ', fully booked'}"
							class="flex min-h-12 items-center justify-center rounded-2xl border-2 text-sm font-bold transition-colors duration-200 {slot === s
								? 'border-gold bg-gold-pale'
								: available
									? 'border-line hover:border-gold'
									: 'cursor-not-allowed border-line bg-cream-deep/50 text-muted line-through opacity-60'}"
						>
							{s}
						</button>
					{/each}
				</div>
				<p class="mt-2 text-xs text-muted">Lunch 11:30 AM–3:00 PM · Dinner 7:00–10:30 PM. Struck-through slots are full or already past for the selected date. Pick a date to see live availability.</p>
			</fieldset>

			<div class="mt-6 grid gap-5 sm:grid-cols-2">
				<div>
					<label for="res-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
					<input id="res-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				<div>
					<label for="res-phone" class="mb-1.5 block text-sm font-bold">Mobile (10-digit) *</label>
					<input id="res-phone" bind:value={phone} required inputmode="tel" autocomplete="tel" placeholder="98XXX XXXXX" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
			</div>
			<div class="mt-5 grid gap-5 sm:grid-cols-2">
				<div>
					<label for="res-occasion" class="mb-1.5 block text-sm font-bold">Occasion (optional)</label>
					<select id="res-occasion" bind:value={occasion} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none">
						<option>Just dinner</option>
						<option>Birthday</option>
						<option>Anniversary</option>
						<option>Family celebration</option>
						<option>Business meal</option>
						<option>Date night</option>
					</select>
				</div>
				<div>
					<label for="res-seating" class="mb-1.5 block text-sm font-bold">Seating preference (optional)</label>
					<select id="res-seating" bind:value={seating} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none">
						{#each seatingPreferences as s}<option value={s}>{s}</option>{/each}
					</select>
				</div>
			</div>
			<div class="mt-5">
				<label for="res-notes" class="mb-1.5 block text-sm font-bold">Dietary / allergy notes &amp; pre-order requests (optional)</label>
				<textarea id="res-notes" bind:value={notes} rows="2" placeholder="e.g. One Jain thali, nut allergy at the table, pre-order a biryani for 8 PM…" class="w-full rounded-2xl border border-line bg-cream px-4 py-3 focus:border-gold focus:outline-none"></textarea>
			</div>

			{#if formError}
				<p class="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>
				{#if alternatives.length > 0}
					<p class="mt-3 text-sm font-semibold">Nearest available instead:</p>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each alternatives as a}
							<button type="button" onclick={() => { slot = a; formError = ''; alternatives = []; }} class="flex min-h-11 items-center rounded-full border-2 border-gold bg-gold-pale px-5 text-sm font-bold text-cocoa">{a}</button>
						{/each}
					</div>
				{/if}
			{/if}

			<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold font-bold text-cocoa-deep transition-transform duration-200 hover:scale-[1.01]">
				<Check size={18} aria-hidden="true" /> Confirm Reservation
			</button>
			<p class="mt-3 text-center text-xs text-muted">No advance payment needed for tables up to 8. Prefer to call? {site.phoneDisplay} · {site.hoursShort}</p>
			<p class="mt-2 text-center text-xs text-muted">Need the private room for 12? <a href="/private-dining" class="font-bold text-maroon underline underline-offset-2">See private dining →</a></p>
		</form>
	</section>
{/if}
