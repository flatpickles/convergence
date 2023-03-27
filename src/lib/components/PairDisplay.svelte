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
			on:keypress={keyPressed}
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

	.placeholder {
		margin: 0rem 0.5rem; // compensate for input padding
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
		padding: 0rem 0.5rem;
		outline: 0px solid transparent;
		text-align: right;
		color: $input-text-color;
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
		color: $response-text-color;
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
