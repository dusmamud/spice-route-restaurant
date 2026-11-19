<script lang="ts">
	// Social brand marks as hand-drawn SVG (Lucide ships no brand icons).
	// 24×24 grid, 2px stroke, round caps/joins, currentColor.
	let { network, size = 18 }: { network: 'facebook' | 'pinterest' | 'x' | 'instagram'; size?: number } =
		$props();
</script>

{#if network === 'facebook'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Facebook"
		><path
			d="M13.5 21.5v-7.2h2.4l.4-2.9h-2.8V9.6c0-.8.3-1.4 1.5-1.4h1.4V5.6c-.3 0-1.2-.1-2.2-.1-2.1 0-3.6 1.3-3.6 3.7v2.2H8.2v2.9h2.4v7.2h2.9z"
		/></svg
	>
{:else if network === 'pinterest'}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Pinterest"
		><path
			d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-1.9.1-2.7l1.1-4.6s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.7-3.9-4-3.9a4.2 4.2 0 0 0-4.4 4.2c0 .8.3 1.7.8 2.2.1.1.1.2.1.3l-.3 1c0 .2-.2.2-.4.1-1.1-.5-1.8-2.2-1.8-3.6 0-2.9 2.1-5.6 6.1-5.6 3.2 0 5.7 2.3 5.7 5.3 0 3.2-2 5.7-4.8 5.7-.9 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.8 1.9-1.1 2.4A10 10 0 1 0 12 2z"
		/></svg
	>
{:else if network === 'x'}
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2.4"
		stroke-linecap="round"
		role="img"
		aria-label="X"
		><path d="M4.5 4.5l15 15M19.5 4.5l-15 15" /></svg
	>
{:else}
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		role="img"
		aria-label="Instagram"
		><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle
			cx="17.2"
			cy="6.8"
			r="0.6"
			fill="currentColor"
			stroke="none"
		/></svg
	>
{/if}
