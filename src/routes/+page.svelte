<script lang="ts">
	import PairDisplay from '$lib/components/PairDisplay.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import GameManager from '$lib/GameManager';
	export let data: PageData;

	let loadingDisplayed = false;
	let errorDisplayed = false;
	let winDisplayed = false;

	let currentPairDisplay: PairDisplay;
	const gameManager = new GameManager(data.firstWord, ({ loading, errored, won }) => {
		loadingDisplayed = loading;
		errorDisplayed = errored;
		winDisplayed = won;
		if (errored) {
			currentPairDisplay.reset();
			currentPairDisplay.setFocus();
		}

		// Svelte reactivity...
		gameManager.convergencePairs = gameManager.convergencePairs;
	});

	onMount(() => {
		// currentPairDisplay.setFocus();
	});

	function userSubmit(event: CustomEvent<{ word: string }>) {
		// todo: sanitize input
		gameManager.submitLocalWord(event.detail.word);
		setTimeout(() => {
			window.scrollTo(0, document.body.scrollHeight);
		}, 0);
	}

	function newGame() {
		location.reload();
	}
</script>

<svelte:head>
	<title>Convergence</title>
</svelte:head>

<div class="pairs-wrapper">
	{#each gameManager.convergencePairs as pair}
		<!-- currentPairDisplay set to last element -->
		<PairDisplay
			bind:userWord={pair.local}
			bind:gptWord={pair.remote}
			on:submit={userSubmit}
			bind:this={currentPairDisplay}
			startFocused={gameManager.convergencePairs.length > 1}
		/>
	{/each}
</div>

<div class="status">
	{#if loadingDisplayed}
		Thinking...
	{:else if errorDisplayed}
		An error occurred. Try again?
	{/if}

	<div class="win" class:visible={winDisplayed} on:click={newGame} on:keypress={newGame}>
		Great work team! Play again?
	</div>
</div>

<style lang="scss">
	.pairs-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.status {
		padding-top: 0.5rem;
		font-size: 1.2rem;
		color: $secondary-text-color;
	}

	.win {
		opacity: 0;
		transition: $fade-transition-time;
		transition-delay: $slide-transition-time + $fade-transition-time;
	}

	.win.visible {
		opacity: 100%;
		cursor: pointer;
	}
</style>
