<script lang="ts">
	import type { ConvergencePair } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let userWord = '';
	export let gptWord = '';

	const dispatch = createEventDispatcher();
	let entryField: HTMLSpanElement;
	let responseField: HTMLDivElement;

	$: gptWordChanged(gptWord);
	function gptWordChanged(newWord: string) {
		if (entryField) {
			console.log(newWord.length > 0);
			entryField.contentEditable = newWord.length > 0 ? 'false' : 'true';
		}
	}

	export function setFocus() {
		entryField.focus();
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
		<span
			class="input"
			bind:this={entryField}
			role="textbox"
			contenteditable="false"
			bind:textContent={userWord}
		/>
	{:else}
		<span
			class="input"
			bind:this={entryField}
			role="textbox"
			contenteditable="true"
			on:keypress={keyPressed}
			bind:textContent={userWord}
		/>
	{/if}
	<div class="response" bind:this={responseField}>
		{gptWord}
	</div>
</div>

<style lang="scss">
	.input {
		width: auto;
		min-width: 10rem;
		max-width: 20rem;
		text-align: center;
	}
	.pair {
		display: flex;
		flex-direction: row;
		column-gap: 1rem;
		font-size: 2rem;
	}
</style>
