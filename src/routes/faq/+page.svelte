<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<PageHero eyebrow="FAQ" title="Good Questions," script="Honest Answers" desc="Everything guests usually ask before their first visit. Anything else? Call us at {site.phoneDisplay}." />

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6">
	<FaqAccordion />
	<p class="mt-8 rounded-2xl bg-gold-pale px-5 py-4 text-center text-sm font-medium text-cocoa">
		Still curious? Write to <a class="font-bold underline underline-offset-4" href="mailto:{site.email}">{site.email}</a> — we reply within one working day.
	</p>
</section>
