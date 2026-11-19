<script lang="ts">
	import { Star } from '@lucide/svelte';

	let { rating, size = 16 }: { rating: number; size?: number } = $props();
	const full = $derived(Math.round(rating));
</script>

<span class="inline-flex items-center gap-0.5 text-[#9a7b00]" role="img" aria-label="Rated {rating} out of 5">
	{#each Array(5) as _, i}
		<Star size={size} fill={i < full ? 'currentColor' : 'none'} class={i < full ? '' : 'text-line'} aria-hidden="true" />
	{/each}
</span>
