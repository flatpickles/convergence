<script lang="ts">
	import AboutOverlay from '$lib/components/AboutOverlay.svelte';
	import Utils from '$lib/Utils';
	import 'ress';
	import { onMount } from 'svelte';
	import '../app.scss';

	export let aboutVisible = false;

	function toggleAbout() {
		aboutVisible = !aboutVisible;
	}

	function updateVH() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	onMount(() => {
		updateVH();

		// Only update with resize on desktop; mobile is funky
		if (!Utils.isMobileDevice) {
			window.addEventListener('resize', () => {
				updateVH();
			});
		}
	});
</script>

<AboutOverlay visible={aboutVisible} />

<section class="header-wrapper">
	<div class="header">
		<h1>Convergence</h1>
		<h1 class="about-button" on:click={toggleAbout} on:keypress={toggleAbout}>
			{#if aboutVisible}x{:else}?{/if}
		</h1>
	</div>
	<div class="header-overlay" />
</section>

<section class="game-wrapper">
	<slot />
</section>

<style lang="scss">
	$top-distance: 50;
	$min-height: calc(var(--vh, 1vh) * $top-distance);
	$bottom-padding: calc((100 - $top-distance) * var(--vh, 1vh));

	h1 {
		font-size: $header-font-size;
	}

	.header-wrapper {
		position: fixed;
		width: 100%;
		display: flex;
		flex-direction: column;
		z-index: 2;
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: calc(($header-height - $header-font-size) / 2) 1rem 0rem;
		color: $header-text-color;
		background-color: $bg-color;
	}

	.header-overlay {
		display: block;
		width: 100%;
		height: calc($header-height / 2);

		background-image: linear-gradient(
			rgba($bg-color, 1),
			cubic-bezier(0.75, 0, 1, 0.75),
			rgba($bg-color, 0)
		);
	}

	.about-button {
		font-size: $large-text-size;
		padding-right: 0.25rem;
		cursor: pointer;
		color: $secondary-text-color;
		transition: color $about-transition-time;

		// No tap highlight on mobile
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		user-select: none;
	}

	.about-button:focus {
		outline: none !important;
	}

	.about-button:hover {
		color: $primary-text-color;
	}

	.game-wrapper {
		width: 100%;

		box-sizing: content-box;
		padding-top: calc($header-height * 1.5);
		min-height: calc($min-height - $header-height * 1.5);
		padding-bottom: $bottom-padding;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
	}
</style>
