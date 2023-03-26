<script lang="ts">
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

	onMount(() => {
		currentPairDisplay.setFocus();
	});

	function userSubmit(event: CustomEvent<{ word: string }>) {
		// todo: sanitize input
		gameManager.submitLocalWord(event.detail.word);
	}
</script>

<svelte:head>
	<title>Convergence</title>
</svelte:head>

<section class="game-wrapper">
	<div class="pairs-wrapper">
		{#each gameManager.convergencePairs as pair}
			<!-- currentPairDisplay set to last element -->
			<PairDisplay
				bind:userWord={pair.user}
				bind:gptWord={pair.gpt}
				on:submit={userSubmit}
				bind:this={currentPairDisplay}
			/>
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
</section>

<style lang="scss">
	.game-wrapper {
		width: 100%;
		min-height: 50%; // todo: improve this
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
	}

	.pairs-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
