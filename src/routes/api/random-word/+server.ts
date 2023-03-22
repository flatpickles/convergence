import type { RequestHandler } from './$types';
import nouns from './nouns.json';

export const GET = (() => {
	const word = nouns.nouns[Math.floor(Math.random() * nouns.nouns.length)];
	return new Response(word);
}) satisfies RequestHandler;
