<script lang="ts">
	import axios from 'axios';
	import type { ConvergencePair } from '$lib/types';
	import PairDisplay from '$lib/components/PairDisplay.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const errorText = 'Error! Please try again.';
	const loadingText = 'Thinking...';

	let pairs: ConvergencePair[] = [{ user: '', gpt: '' }];
	let currentPairDisplay: PairDisplay;
	let statusDisplay: HTMLDivElement;
	let nextWord: string | null = data.firstWord;
	let pendingSubmission: string | null = null;

	onMount(() => {
		currentPairDisplay.setFocus();
	});

	function submitWord(submittedWord: string) {
		// Make sure we have the nextWord
		if (!nextWord) {
			throw new Error('Submission made before next word was ready');
		}

		// Make the request for the next word
		const lastWord = nextWord;
		axios
			.get('/api/converge', {
				params: {
					word1: nextWord,
					word2: submittedWord
				}
			})
			.then((res) => {
				nextWord = res.data;
				if (pendingSubmission) {
					submitWord(pendingSubmission);
					pendingSubmission = null;
				}
			})
			.catch((err) => {
				throw err;
				// todo: handle error (probably offer a click to retry)
			});

		// Update & display current state
		pairs[pairs.length - 1].gpt = nextWord;
		pairs.push({ user: '', gpt: '' });
		pairs = pairs;
		nextWord = null;
		statusDisplay.innerText = '';
		setTimeout(() => {
			currentPairDisplay.setFocus();
		}, 0);
	}

	function userSubmit(event: CustomEvent<{ word: string }>) {
		const submittedWord = event.detail.word;

		// Check if the previous request is still pending
		if (!nextWord) {
			pendingSubmission = submittedWord;
			statusDisplay.innerText = loadingText;
			return;
		}

		// Submit the word!
		submitWord(submittedWord);
	}
</script>

<svelte:head>
	<title>Convergence</title>
</svelte:head>

<div class="pairs-wrapper">
	{#each pairs as pair, idx}
		{#if idx === pairs.length - 1}
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

<div class="status" bind:this={statusDisplay} />

<style lang="scss">
	.pairs-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
