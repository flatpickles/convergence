import axios from 'axios';
import { OPENAI_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Utils from '$lib/Utils';

function formPrompt(word1: string, word2: string, percentile = 90) {
	const prompt =
		`Respond with a simple word that connects the words "${word1}" and "${word2}". ` +
		`The response could be: the conceptual midpoint between these words, something similar or inclusive of both words, or some property they share. ` +
		`The response must be a singular noun, verb, or adjective that ${percentile}% of ` +
		`English speakers would use, and must not be one of the following words: "${word1}", "${word2}".`;
	return prompt;
}

export const GET = (async ({ url }) => {
	// if (Math.random() < 0.9) throw new Error('Random error');
	// return new Response('testing');

	// Get input words
	const word1 = url.searchParams.get('word1');
	const word2 = url.searchParams.get('word2');
	if (!word1 || !word2) {
		throw error(400, 'Parameters word1 and word2 must be defined.');
	}

	// Formulate GPT request data
	const requestURL = 'https://api.openai.com/v1/chat/completions';
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${OPENAI_API_KEY}`
	};
	const data = {
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: formPrompt(word1, word2)
			}
		]
	};

	// Make request and return a cleaned-up response
	const word = await axios
		.post(requestURL, data, {
			headers: headers,
			signal: AbortSignal.timeout(3000)
		})
		.then((response) => {
			const responseContent = response.data.choices[0].message.content;
			return Utils.cleanString(responseContent);
		})
		.catch((thrown) => {
			if (axios.isCancel(thrown)) {
				console.log(thrown.message);
				throw error(408, 'OpenAI request timed out.');
			} else if (thrown.response) {
				console.log(thrown.response.data);
				throw thrown;
			}
		});

	if (!word) throw error(500, 'OpenAI response was empty.');
	return new Response(word);
}) satisfies RequestHandler;
