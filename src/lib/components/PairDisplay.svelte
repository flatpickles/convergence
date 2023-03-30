<script lang="ts">
	import type { ConvergencePair } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let userWord = '';
	export let gptWord = '';
	export let startFocused = false;

	const dispatch = createEventDispatcher();
	let entryField: HTMLSpanElement;
	let responseField: HTMLDivElement;
	let entryFieldFocused = startFocused;
	$: showPlaceholder =
		!entryField || (!entryFieldFocused && gptWord.length == 0 && entryField.innerText === '');

	onMount(() => {
		if (startFocused) {
			setFocus();
		}
		entryField.addEventListener('focus', () => {
			entryFieldFocused = true;
		});
		entryField.addEventListener('blur', () => {
			entryFieldFocused = false;
		});
		entryField.addEventListener('paste', (event) => {
			event.preventDefault(); // prevent pasting
		});
	});

	export function setFocus() {
		entryField.focus();
	}

	export function reset() {
		entryField.contentEditable = 'true';
	}

	function pairClicked() {
		// set focus only if entry is unfocused and empty
		if (!entryFieldFocused && entryField.innerText === '') setFocus();
	}

	function keydown(event: KeyboardEvent) {
		// Check for submit
		if (event.key === 'Enter') {
			const currentWord = (event.target as HTMLSpanElement).innerText;
			userWord = currentWord;
			event.preventDefault();
			entryField.contentEditable = 'false';
			dispatch('submit', {
				word: currentWord
			});
			return;
		}

		// Only allow upper or lowercase letters
		if (event.key.length === 1 && !event.key.match(/[a-zA-Z]/)) {
			event.preventDefault();
		}
	}
</script>

<div
	class="pair"
	class:responded={gptWord.length > 0}
	on:click={pairClicked}
	on:keyup={pairClicked}
>
	<div class="left-spacer" />
	<div class="input-wrapper">
		<div class="placeholder" class:hidden={!showPlaceholder}>(your word here)</div>
		<div
			class="input"
			bind:this={entryField}
			role="textbox"
			contenteditable={gptWord.length == 0}
			on:keydown={keydown}
			autocapitalize="off"
		>
			{userWord}
		</div>
	</div>
	<div class="response-wrapper">
		<div class="response" bind:this={responseField}>
			{gptWord}
		</div>
	</div>
</div>

<style lang="scss">
	$distance-between-pairs: 2rem;
	$half-distance: calc($distance-between-pairs / 2);

	.pair {
		display: flex;
		flex-direction: row;
		width: 100%;
		font-size: 2rem;
	}

	.left-spacer {
		flex: 1;
	}

	.placeholder {
		margin: 0rem $half-distance; // compensate for input padding
		position: absolute;
		transform: translateX(-50%);
		color: $placeholder-text-color;
		opacity: 100%;
		white-space: nowrap;
		pointer-events: none;
		user-select: none;
	}

	.placeholder.hidden {
		opacity: 0%;
	}

	.input {
		padding: 0rem $half-distance;
		outline: 0px solid transparent;
		text-align: right;
		color: $primary-text-color;
	}

	.response-wrapper {
		flex: 1;
		min-width: 0%; // todo: set in JS to improve snappiness maybe
		transition: $slide-transition-time;
	}

	.response {
		padding: 0rem $half-distance;
		opacity: 0%;
		transition: $fade-transition-time;
		transition-delay: $slide-transition-time;
		color: $secondary-text-color;
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
