import { dishes } from '#lib/data/site.ts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return dishes.map((d) => ({ slug: d.id }));
}

export const load: PageLoad = ({ params }) => {
	const dish = dishes.find((d) => d.id === params.slug);
	if (!dish) error(404, 'Dish not found');
	const related = dishes.filter((d) => d.category === dish.category && d.id !== dish.id).slice(0, 3);
	const more = dishes.filter((d) => d.category !== dish.category && d.id !== dish.id).slice(0, 3 - related.length);
	return { dish, related: [...related, ...more] };
};
