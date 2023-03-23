<script lang="ts">
	import axios from 'axios';
	import type { ConvergencePair } from '$lib/types';
	import PairDisplay from '$lib/components/PairDisplay.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let pairs: ConvergencePair[] = [{ user: '', gpt: '' }];
	let currentPairDisplay: PairDisplay;
	let nextWord = data.firstWord;

	onMount(() => {
		currentPairDisplay.setFocus();
	});

	function submitted(event: CustomEvent<{ word: string }>) {
		const submittedWord = event.detail.word;

		// Make the request for the next word
		axios
			.get('/api/converge', {
				params: {
					word1: nextWord,
					word2: submittedWord
				}
			})
			.then((res) => {
				nextWord = res.data;
			});

		// Display results for current state
		pairs[pairs.length - 1].gpt = nextWord;
		pairs.push({ user: '', gpt: '' });
		pairs = pairs;
		setTimeout(() => {
			currentPairDisplay.setFocus();
		}, 0);

		// setTimeout(() => {
		// 	pairs[pairs.length - 1].gpt = submittedWord;
		// 	pairs.push({ user: '', gpt: '' });
		// 	pairs = pairs;
		// 	setTimeout(() => {
		// 		currentPairDisplay.setFocus();
		// 	}, 0);
		// }, 1000);
	}
</script>

<div class="pairs-wrapper">
	{#each pairs as pair, idx}
		{#if idx === pairs.length - 1}
			<!-- Last pair display is being edited-->
			<PairDisplay
				bind:userWord={pair.user}
				bind:gptWord={pair.gpt}
				on:submit={submitted}
				bind:this={currentPairDisplay}
			/>
		{:else}
			<PairDisplay userWord={pair.user} gptWord={pair.gpt} />
		{/if}
	{/each}
</div>

<style lang="scss">
	.pairs-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: blue;
	}
</style>
