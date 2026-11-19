<script lang="ts">
	import { Briefcase, Check, Clock, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { jobs } from '#lib/data/site.ts';

	let name = $state('');
	let phone = $state('');
	let role = $state(jobs[0].title);
	let message = $state('');
	let applied = $state(false);
	let formError = $state('');

	function submit() {
		if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
			formError = 'Please enter your name and a valid 10-digit mobile number.';
			return;
		}
		formError = '';
		applied = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="Careers — SpiceRoute Restaurant & Bistro"
	description="Work at SpiceRoute, Bandra West: sous chef, pastry commis, server, bartender and delivery captain roles. Staff meals, tips and a kitchen that teaches."
	path="/careers"
	image="chef-portrait"
/>

<PageHero eyebrow="Careers" title="Join the" script="SpiceRoute Family" desc="We’re a small team that cooks like a big one. If you love feeding people, there’s a station with your name on it." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-5 md:grid-cols-3">
		{#each [{ icon: Users, title: 'A team, not a rota', text: '28 people across three kitchens and one dining room. Most of us have been here since 2016.' }, { icon: Clock, title: 'Fair shifts', text: 'Two days off a week, no split shifts unless you ask for them, and overtime paid — not “adjusted”.' }, { icon: Briefcase, title: 'Real growth', text: 'Our last two sous chefs started as commis. We teach, we promote, and we pay for courses.' }] as p}
			<div class="rounded-3xl border border-line bg-white p-6 shadow-sm">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-gold-pale text-maroon"><p.icon size={24} aria-hidden="true" /></span>
				<h2 class="mt-4 font-display text-xl font-bold">{p.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-14 font-display text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold">Open Roles</h2>
	<div class="mt-6 grid gap-5 lg:grid-cols-2">
		{#each jobs as job}
			<article class="rounded-3xl border border-line bg-white p-6 shadow-sm">
				<div class="flex flex-wrap items-center gap-2">
					<h3 class="font-display text-xl font-bold">{job.title}</h3>
					<span class="rounded-full bg-gold-pale px-3 py-1 text-xs font-bold text-cocoa">{job.type}</span>
					<span class="rounded-full border border-line px-3 py-1 text-xs font-bold text-muted">{job.dept}</span>
				</div>
				<p class="mt-3 text-sm leading-relaxed text-muted">{job.desc}</p>
				<button type="button" onclick={() => { role = job.title; document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' }); }} class="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-cocoa px-5 text-sm font-bold transition-colors duration-200 hover:bg-cocoa hover:text-white">Apply for this role →</button>
			</article>
		{/each}
	</div>

	{#if applied}
		<div class="mx-auto mt-12 max-w-2xl rounded-3xl border border-line bg-green-50 p-8 text-center">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={32} aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-2xl font-bold">Application Received, {name}!</h2>
			<p class="mt-2 text-sm text-muted">Thank you for applying for <strong>{role}</strong>. Our team will call {phone} within 3 working days if we’d like to meet you. This is a mock application — no details were sent.</p>
		</div>
	{:else}
		<form
			id="apply-form"
			class="mx-auto mt-12 max-w-2xl scroll-mt-28 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<h2 class="font-display text-2xl font-bold">Apply Now</h2>
			<p class="mt-1 text-sm text-muted">No CV needed for a first chat — tell us who you are and what you love cooking or serving.</p>
			<div class="mt-5 grid gap-4 sm:grid-cols-2">
				<div>
					<label for="job-name" class="mb-1.5 block text-sm font-bold">Your name *</label>
					<input id="job-name" bind:value={name} required autocomplete="name" placeholder="e.g. Aarav Mehta" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
				<div>
					<label for="job-phone" class="mb-1.5 block text-sm font-bold">Mobile (10-digit) *</label>
					<input id="job-phone" bind:value={phone} required inputmode="tel" autocomplete="tel" placeholder="98XXX XXXXX" class="min-h-12 w-full rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none" />
				</div>
			</div>
			<div class="mt-4">
				<label for="job-role" class="mb-1.5 block text-sm font-bold">Role</label>
				<select id="job-role" bind:value={role} class="min-h-12 w-full appearance-none rounded-2xl border border-line bg-cream px-4 focus:border-gold focus:outline-none">
					{#each jobs as j}<option value={j.title}>{j.title}</option>{/each}
				</select>
			</div>
			<div class="mt-4">
				<label for="job-msg" class="mb-1.5 block text-sm font-bold">Tell us about yourself (optional)</label>
				<textarea id="job-msg" bind:value={message} rows="3" placeholder="Experience, favourite dish to cook, why SpiceRoute…" class="w-full rounded-2xl border border-line bg-cream px-4 py-3 focus:border-gold focus:outline-none"></textarea>
			</div>
			{#if formError}<p class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{formError}</p>{/if}
			<button type="submit" class="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold font-bold text-cocoa-deep">Submit Application</button>
		</form>
	{/if}
</section>
