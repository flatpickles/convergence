<script lang="ts">
	import PairDisplay from '$lib/components/PairDisplay.svelte';
	import type { PageData } from './$types';
	import GameManager from '$lib/GameManager';
	import Utils from '$lib/Utils';
	export let data: PageData;

	let loadingDisplayed = false;
	let errorDisplayed = false;
	let winDisplayQuality = 0;

	let currentPairDisplay: PairDisplay;
	const gameManager = new GameManager(data.firstWord, ({ loading, errored, winQuality }) => {
		loadingDisplayed = loading;
		errorDisplayed = errored;
		winDisplayQuality = winQuality;
		if (errored) {
			currentPairDisplay.reset();
			currentPairDisplay.setFocus();
		}

		// Svelte reactivity...
		gameManager.convergencePairs = gameManager.convergencePairs;
	});

	function userSubmit(event: CustomEvent<{ word: string }>) {
		if (!event.detail.word || event.detail.word === '') {
			currentPairDisplay.reset();
			currentPairDisplay.setFocus();
			return;
		}
		gameManager.submitLocalWord(event.detail.word);

		// Only scroll to bottom on desktop; mobile is funky
		if (!Utils.isMobileDevice) {
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight);
			}, 0);
		}
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

	<div class="win" class:visible={winDisplayQuality > 0}>
		{#if winDisplayQuality == 2}
			Great work team!
		{:else}
			Close enough!
		{/if}
		<a href="/" on:click={newGame} on:keypress={newGame}>Play again?</a>
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
		text-align: center;
		padding-top: 0.75rem;
		font-size: $small-text-size;
		color: $secondary-text-color;
		@media screen and (max-width: $mobile-breakpoint) {
			font-size: $small-text-size-mobile;
		}
	}

	.win {
		opacity: 0;
		pointer-events: none;
		transition: opacity $fade-transition-time;
		transition-delay: $slide-transition-time + $fade-transition-time;
	}

	.win.visible {
		pointer-events: all;
		opacity: 100%;
	}
</style>
