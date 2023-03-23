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
			event.preventDefault();
			entryField.contentEditable = 'false';
			dispatch('submit', {
				word: (event.target as HTMLSpanElement).innerText
			});
		}
	}
</script>

<div class="pair">
	{#if gptWord.length > 0}
		<div
			class="input input-complete"
			bind:this={entryField}
			role="textbox"
			contenteditable="false"
			bind:textContent={userWord}
		/>
		<div class="response" bind:this={responseField}>
			{gptWord}
		</div>
	{:else}
		<div
			class="input"
			bind:this={entryField}
			role="textbox"
			contenteditable="true"
			on:keypress={keyPressed}
			bind:textContent={userWord}
		/>
	{/if}
</div>

<style lang="scss">
	.pair {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		column-gap: 1rem;

		width: 100%;
		font-size: 2rem;
	}

	.input {
		box-sizing: content-box;
		min-width: 10rem;
		text-align: center;
		outline: 0px solid transparent;
	}

	.input-complete {
		text-align: right;
	}

	.response {
		text-align: left;
	}
</style>
