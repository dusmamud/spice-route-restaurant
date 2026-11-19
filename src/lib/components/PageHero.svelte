<script lang="ts">
	let { eyebrow, title, script, desc }: { eyebrow: string; title: string; script?: string; desc?: string } = $props();
</script>

<section class="bg-cocoa-deep px-4 pt-14 pb-12 text-center text-white sm:px-6">
	<p class="text-xs font-bold tracking-[0.28em] text-gold-soft uppercase">{eyebrow}</p>
	<h1 class="mx-auto mt-3 max-w-3xl font-display text-[clamp(2rem,6vw,3.25rem)] leading-tight font-bold">
		{title}
		{#if script}<span class="block font-script text-[clamp(2.4rem,7vw,4rem)] leading-tight font-normal text-gold-soft">{script}</span>{/if}
	</h1>
	{#if desc}<p class="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">{desc}</p>{/if}
</section>
