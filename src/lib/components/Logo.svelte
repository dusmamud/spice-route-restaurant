<script lang="ts">
	import { ChefHat } from '@lucide/svelte';

	let { light = false }: { light?: boolean } = $props();
</script>

<a href="/" class="flex items-center gap-2" aria-label="SpiceRoute — home">
	<span
		class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-cocoa-deep text-gold-soft sm:h-11 sm:w-11"
		aria-hidden="true"
	>
		<ChefHat size={24} />
	</span>
	<span class="min-w-0 leading-none">
		<span class="block font-display text-[1.4rem] font-bold tracking-tight text-white sm:text-[1.65rem]">
			Spice<span class="text-gold-soft">Route</span><sup class="text-[0.55rem] align-super">®</sup>
		</span>
		<span class="mt-0.5 block text-[0.65rem] font-medium tracking-[0.22em] text-gold-soft uppercase">
			Restaurant &amp; Bistro
		</span>
	</span>
</a>
