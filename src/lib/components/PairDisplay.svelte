<script lang="ts">
	import type { ConvergencePair } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let userWord = '';
	export let gptWord = '';

	const dispatch = createEventDispatcher();
	let entryField: HTMLSpanElement;
	let responseField: HTMLDivElement;

	export function setFocus() {
		entryField.focus();
	}

	export function reset() {
		entryField.contentEditable = 'true';
	}

	function keyPressed(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			const currentWord = (event.target as HTMLSpanElement).innerText;
			userWord = currentWord;
			event.preventDefault();
			entryField.contentEditable = 'false';
			dispatch('submit', {
				word: currentWord
			});
		}
	}
</script>

<div class="pair" class:responded={gptWord.length > 0} on:click={setFocus} on:keyup={setFocus}>
	<div class="left-spacer" />
	<div
		class="input"
		bind:this={entryField}
		role="textbox"
		contenteditable={gptWord.length == 0}
		on:keypress={keyPressed}
	>
		{userWord}
	</div>
	<div class="response-wrapper">
		<div class="response" bind:this={responseField}>
			{gptWord}
		</div>
	</div>
</div>

<style lang="scss">
	$slide-transition-time: 500ms;
	$fade-transition-time: 1000ms;

	.pair {
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 2rem;
	}

	.left-spacer {
		flex: 1;
	}

	.input {
		padding: 0rem 0.5rem;
		outline: 0px solid transparent;
	}

	.response-wrapper {
		flex: 1;
		min-width: 0%; // todo: set in JS to improve snappiness maybe
		transition: $slide-transition-time;
	}

	.response {
		padding: 0rem 0.5rem;
		opacity: 0%;
		transition: $fade-transition-time;
		transition-delay: $slide-transition-time;
	}

	.responded {
		.response-wrapper {
			min-width: 50%;
		}

		.response {
			opacity: 100%;
		}
	}
</style>
