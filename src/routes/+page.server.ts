import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	// Get a random word from our API and return it as the first word
	const word = await fetch(`/api/random-word`).then((response) => response.text());
	return {
		firstWord: word
	};
}) satisfies PageServerLoad;
