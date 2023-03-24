<script lang="ts">
	import axios from 'axios';
	import type { ConvergencePair } from '$lib/types';
	import PairDisplay from '$lib/components/PairDisplay.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import GameManager from '$lib/GameManager';
	export let data: PageData;

	let loadingDisplayed = false;
	let errorDisplayed = false;

	let currentPairDisplay: PairDisplay;
	const gameManager = new GameManager(
		data.firstWord,
		() => {
			// Svelte reactivity...
			gameManager.convergencePairs = gameManager.convergencePairs;
			setTimeout(() => currentPairDisplay.setFocus(), 0);
		},
		(loading) => {
			loadingDisplayed = loading;
		},
		(error) => {
			// todo clean this up
			errorDisplayed = error;
			if (error) {
				loadingDisplayed = false;
				currentPairDisplay.reset();
				currentPairDisplay.setFocus();
			}
		}
	);

	// let pairs: ConvergencePair[] = [{ user: '', gpt: '' }];
	// let nextWord: string | null = data.firstWord;
	// let pendingSubmission: string | null = null;

	onMount(() => {
		currentPairDisplay.setFocus();
	});

	// function requestNextWord(submittedWord: string) {
	// 	const lastWord = nextWord;
	// 	axios
	// 		.get('/api/converge', {
	// 			params: {
	// 				word1: nextWord,
	// 				word2: submittedWord
	// 			}
	// 		})
	// 		.then((res) => {
	// 			nextWord = res.data;
	// 			if (pendingSubmission) {
	// 				submitWord(pendingSubmission);
	// 				pendingSubmission = null;
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 			nextWord = lastWord;
	// 			errored = true;
	// 		});
	// }

	// function retry() {
	// 	if (!pendingSubmission) throw new Error('No pending submission to retry.');
	// 	errorDisplayed = false;
	// 	requestNextWord(pendingSubmission);
	// }

	// function submitWord(submittedWord: string) {
	// 	// Make sure we have the nextWord
	// 	if (!nextWord) {
	// 		throw new Error('Submission made before next word was ready');
	// 	}

	// 	// Make the request for the next word
	// 	requestNextWord(submittedWord);

	// 	// Update & display current state
	// 	pairs[pairs.length - 1].gpt = nextWord;
	// 	pairs.push({ user: '', gpt: '' });
	// 	pairs = pairs;
	// 	nextWord = null;
	// 	loading = false;
	// 	setTimeout(() => {
	// 		currentPairDisplay.setFocus();
	// 	}, 0);
	// }

	function userSubmit(event: CustomEvent<{ word: string }>) {
		const submittedWord = event.detail.word;
		gameManager.submitLocalWord(submittedWord);

		// // Check if the previous request failed or is still pending
		// if (errored) {
		// 	pendingSubmission = submittedWord;
		// 	errorDisplayed = true;
		// 	return;
		// } else if (!nextWord) {
		// 	pendingSubmission = submittedWord;
		// 	loading = true;
		// 	return;
		// }

		// // Submit the word!
		// submitWord(submittedWord);
	}
</script>

<svelte:head>
	<title>Convergence</title>
</svelte:head>

<div class="pairs-wrapper">
	{#each gameManager.convergencePairs as pair, idx}
		{#if idx === gameManager.convergencePairs.length - 1}
			<!-- Last pair display is being edited-->
			<PairDisplay
				bind:userWord={pair.user}
				bind:gptWord={pair.gpt}
				on:submit={userSubmit}
				bind:this={currentPairDisplay}
			/>
		{:else}
			<PairDisplay userWord={pair.user} gptWord={pair.gpt} />
		{/if}
	{/each}
</div>

<div class="status">
	{#if loadingDisplayed}
		Thinking...
	{:else if errorDisplayed}
		<!-- todo: make it clickable -->
		An error occurred. Try again?
	{/if}
</div>

<style lang="scss">
	.pairs-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
