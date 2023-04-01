<script lang="ts">
	import AboutOverlay from '$lib/components/AboutOverlay.svelte';
	import 'ress';
	import '../app.scss';

	export let aboutVisible = false;

	function toggleAbout() {
		aboutVisible = !aboutVisible;
	}
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
	$top-distance: 50vh;

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
		height: $header-height;

		background-image: linear-gradient(
			rgba($bg-color, 1),
			cubic-bezier(0.75, 0, 1, 0.75),
			rgba($bg-color, 0)
		);
	}

	.about-button {
		font-size: 2rem;
		padding-right: 0.25rem;
		cursor: pointer;
		user-select: none;
		color: $secondary-text-color;
		transition: $about-transition-time;
	}

	.about-button:hover {
		color: $primary-text-color;
	}

	.game-wrapper {
		width: 100%;

		box-sizing: content-box;
		padding-top: $header-height * 2;
		min-height: calc($top-distance - $header-height * 2);
		padding-bottom: calc(100vh - $top-distance);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
	}
</style>
