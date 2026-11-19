// Remove the white studio background from dish masters so they become true
// transparent cutouts (alpha channel). No install needed — pure sharp + a
// flood fill from the image borders through near-white pixels.
// White/light food inside the tray is NOT connected to the border white
// (the dark tray separates it), so it stays opaque. Run: node scripts/remove-bg.mjs
import sharp from 'sharp';
import { join } from 'node:path';

const SRC = new URL('../static/images/original/', import.meta.url);
const NAMES = [
	'mutton-biryani-transparent',
	'jeera-chawal-transparent',
	'kadai-chicken-transparent',
	'palak-paneer-transparent'
];

// A pixel counts as "background white" when it is bright and near-grey.
const isWhite = (r, g, b) => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return lum > 228 && max - min < 28;
};

for (const name of NAMES) {
	const file = join(SRC.pathname, `${name}.png`);
	const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const { width: W, height: H, channels: C } = info;
	const flooded = new Uint8Array(W * H);
	const stack = [];

	const idx = (x, y) => y * W + x;
	const seed = (x, y) => {
		const i = idx(x, y) * C;
		if (!flooded[idx(x, y)] && isWhite(data[i], data[i + 1], data[i + 2])) {
			flooded[idx(x, y)] = 1;
			stack.push(idx(x, y));
		}
	};

	// Seed from all four borders.
	for (let x = 0; x < W; x++) {
		seed(x, 0);
		seed(x, H - 1);
	}
	for (let y = 0; y < H; y++) {
		seed(0, y);
		seed(W - 1, y);
	}

	// Flood through connected near-white pixels.
	while (stack.length) {
		const p = stack.pop();
		const x = p % W;
		const y = (p / W) | 0;
		const neighbours = [
			x > 0 ? p - 1 : -1,
			x < W - 1 ? p + 1 : -1,
			y > 0 ? p - W : -1,
			y < H - 1 ? p + W : -1
		];
		for (const n of neighbours) {
			if (n < 0 || flooded[n]) continue;
			const i = n * C;
			if (isWhite(data[i], data[i + 1], data[i + 2])) {
				flooded[n] = 1;
				stack.push(n);
			}
		}
	}

	// Apply alpha: flooded = transparent. Feather the edge: opaque pixels
	// touching a transparent one fade a little if they are pale.
	let transparentCount = 0;
	for (let p = 0; p < W * H; p++) {
		const i = p * C;
		if (flooded[p]) {
			data[i + 3] = 0;
			transparentCount++;
		}
	}
	for (let y = 1; y < H - 1; y++) {
		for (let x = 1; x < W - 1; x++) {
			const p = y * W + x;
			if (flooded[p]) continue;
			const touches =
				flooded[p - 1] || flooded[p + 1] || flooded[p - W] || flooded[p + W];
			if (!touches) continue;
			const i = p * C;
			const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
			if (lum > 200) data[i + 3] = Math.round(255 * Math.max(0, (255 - lum) / 55));
		}
	}

	await sharp(data, { raw: { width: W, height: H, channels: C } })
		.png()
		.toFile(file);
	console.log(
		`✓ ${name}: ${W}x${H}, transparent ${(100 * transparentCount / (W * H)).toFixed(1)}% of pixels`
	);
}
console.log('Done — masters now have real alpha.');
