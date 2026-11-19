<script lang="ts">
	import { ArrowLeft, SearchX } from '@lucide/svelte';
	import { page } from '$app/state';
</script>

<section class="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
	<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-pale text-maroon"><SearchX size={40} aria-hidden="true" /></span>
	<h1 class="mt-6 font-display text-[clamp(2.5rem,8vw,4rem)] leading-none font-bold">404</h1>
	<p class="mt-3 font-display text-2xl font-bold">This page left the menu.</p>
	<p class="mt-2 leading-relaxed text-muted">
		The page “{page.url.pathname}” doesn’t exist — or it was taken off the specials board. Let’s get you back to something delicious.
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a href="/" class="flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 font-bold text-cocoa-deep"><ArrowLeft size={18} aria-hidden="true" /> Back to Home</a>
		<a href="/menu" class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold">Browse the Menu</a>
	</div>
</section>
