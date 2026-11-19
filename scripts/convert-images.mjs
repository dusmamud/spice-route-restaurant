// Convert PNG masters in originals/ (project root, NOT deployed) into the
// delivery chain:
//   <name>-<width>.avif  (quality 50, alpha kept)
//   <name>-<width>.webp  (quality 80, alpha kept)
//   <name>-<width>.jpg   (quality 84) + <name>-800.jpg fallback — opaque only
//   <name>-<width>.png   (resized, alpha kept) — transparent only, PNG fallback
// Widths: 480 / 800 / 1200 / 1600. Run: npm run images
// Pass names to convert only those, e.g. `npm run images -- garlic-butter-naan jeera-rice`.
// Transparent PNG masters (filename ends with -transparent) keep their alpha
// in AVIF/WebP/PNG; JPG is skipped for them because JPG has no alpha.
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = new URL('../originals/', import.meta.url);
const OUT = new URL('../static/images/', import.meta.url);
const WIDTHS = [480, 800, 1200, 1600];

const only = process.argv.slice(2).map((a) => a.replace(/\.png$/, ''));
const files = (await readdir(SRC))
	.filter((f) => f.toLowerCase().endsWith('.png'))
	.filter((f) => only.length === 0 || only.includes(parse(f).name));
if (files.length === 0) {
	console.log('No matching PNG masters in originals/ — nothing to convert.');
	process.exit(0);
}
await mkdir(OUT, { recursive: true });

for (const file of files) {
	const { name } = parse(file);
	const transparent = name.endsWith('-transparent');
	const input = join(SRC.pathname, file);
	for (const width of WIDTHS) {
		const base = sharp(input).resize(width, null, { withoutEnlargement: true });
		await base.clone().avif({ quality: 50, effort: 2 }).toFile(join(OUT.pathname, `${name}-${width}.avif`));
		await base.clone().webp({ quality: 80 }).toFile(join(OUT.pathname, `${name}-${width}.webp`));
		if (transparent) {
			await base.clone().png().toFile(join(OUT.pathname, `${name}-${width}.png`));
		} else {
			await base
				.clone()
				.flatten({ background: '#fdf9f4' })
				.jpeg({ quality: 84 })
				.toFile(join(OUT.pathname, `${name}-${width}.jpg`));
		}
	}
	console.log(
		`✓ ${name}: avif + webp${transparent ? ' + png' : ' + jpg'} @ ${WIDTHS.join('/')}`
	);
}
console.log(`Done — ${files.length} master(s) converted.`);
