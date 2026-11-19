<script lang="ts">
	// Per-page SEO — every static page renders this with its own title,
	// description, canonical path and share image. The layout no longer
	// carries a home title/description, so pages never inherit the wrong meta.
	import { site } from '#lib/data/site.ts';

	let {
		title,
		description,
		path = '/',
		image = 'hero-biryani'
	}: { title: string; description: string; path?: string; image?: string } = $props();

	const url = $derived(`${site.url}${path}`);
	const img = $derived(`${site.url}/images/${image}-1200.jpg`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={img} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
</svelte:head>
