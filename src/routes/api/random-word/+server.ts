import type { RequestHandler } from './$types';
import adjs from './adjs.json';
import nouns from './nouns.json';
import verbs from './verbs.json';

export const GET = (() => {
	const fullSize = adjs.adjs.length + nouns.nouns.length + verbs.verbs.length;
	const wordIndex = Math.floor(Math.random() * fullSize);
	if (wordIndex < adjs.adjs.length) {
		return new Response(adjs.adjs[wordIndex]);
	} else if (wordIndex < adjs.adjs.length + nouns.nouns.length) {
		return new Response(nouns.nouns[wordIndex - adjs.adjs.length]);
	} else {
		return new Response(verbs.verbs[wordIndex - adjs.adjs.length - nouns.nouns.length].present);
	}
}) satisfies RequestHandler;
