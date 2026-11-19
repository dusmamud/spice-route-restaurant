// Convert only the named PNG masters (args) to AVIF/WebP/JPG @ 480/800/1200/1600.
// Usage: node scripts/convert-subset.mjs <name> [<name> ...]
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT = new URL('../static/images/', import.meta.url);
const WIDTHS = [480, 800, 1200, 1600];
const names = process.argv.slice(2);
if (names.length === 0) {
	console.log('Usage: node scripts/convert-subset.mjs <name> [...]');
	process.exit(1);
}
await mkdir(OUT, { recursive: true });
for (const name of names) {
	const input = join(new URL('../static/images/original/', import.meta.url).pathname, `${name}.png`);
	for (const width of WIDTHS) {
		const base = sharp(input).resize(width, null, { withoutEnlargement: true });
		await base.clone().avif({ quality: 50, effort: 2 }).toFile(join(OUT.pathname, `${name}-${width}.avif`));
		await base.clone().webp({ quality: 80 }).toFile(join(OUT.pathname, `${name}-${width}.webp`));
		await base
			.clone()
			.flatten({ background: '#fdf9f4' })
			.jpeg({ quality: 84 })
			.toFile(join(OUT.pathname, `${name}-${width}.jpg`));
	}
	console.log(`✓ ${name}`);
}
console.log('Done.');
