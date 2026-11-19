<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { faqs } from '#lib/data/site.ts';

	let openIdx = $state<number | null>(0);
</script>

<div class="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
	{#each faqs as item, i}
		<div>
			<button
				type="button"
				onclick={() => (openIdx = openIdx === i ? null : i)}
				aria-expanded={openIdx === i}
				class="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors duration-200 hover:bg-cream"
			>
				<span>{item.q}</span>
				<ChevronDown size={20} class="shrink-0 transition-transform duration-200 {openIdx === i ? 'rotate-180' : ''}" aria-hidden="true" />
			</button>
			{#if openIdx === i}
				<p class="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
			{/if}
		</div>
	{/each}
</div>
