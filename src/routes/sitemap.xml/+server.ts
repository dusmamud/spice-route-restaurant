import { dishes, site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/menu', priority: '0.9', changefreq: 'weekly' },
	{ path: '/order', priority: '0.9', changefreq: 'weekly' },
	{ path: '/reservations', priority: '0.8', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/gallery', priority: '0.7', changefreq: 'monthly' },
	{ path: '/offers', priority: '0.8', changefreq: 'weekly' },
	{ path: '/reviews', priority: '0.7', changefreq: 'weekly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/catering', priority: '0.7', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

const dishPages = dishes.map((d) => ({
	path: `/menu/${d.id}`,
	priority: '0.8',
	changefreq: 'monthly'
}));

export function GET() {
	const pages = [...staticPages, ...dishPages];
	const urls = pages.map(
		(p) =>
			`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
