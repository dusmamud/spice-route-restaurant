<script lang="ts">
	import { ChefHat, Leaf, Users } from '@lucide/svelte';

	let { icon, title }: { icon: 'cloche' | 'leaf' | 'chef' | 'users'; title: string } = $props();
</script>

{#if icon === 'cloche'}
	<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M3 18h18" /><path d="M4 17h16a1 1 0 0 0 1-1 9 9 0 0 0-6-8.4V7h1a1 1 0 0 0 0-2h-2a1 1 0 0 0-1 1v1.6A9 9 0 0 0 3 16a1 1 0 0 0 1 1Z" />
	</svg>
{:else if icon === 'leaf'}
	<Leaf size={28} aria-hidden="true" />
{:else if icon === 'chef'}
	<ChefHat size={28} aria-hidden="true" />
{:else}
	<Users size={28} aria-hidden="true" />
{/if}
<span class="sr-only">{title}</span>
