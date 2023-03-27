<script lang="ts">
	import 'ress';
	import '../app.scss';
</script>

<section class="header-wrapper">
	<div class="header">
		<h1>Convergence</h1>
		<h1>?</h1>
	</div>
	<div class="header-overlay" />
</section>

<section class="game-wrapper">
	<slot />
</section>

<style lang="scss">
	$top-distance: 50vh;

	h1 {
		font-size: 2rem;
	}

	.header-wrapper {
		position: fixed;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: 0.25rem 1rem 0rem;
		color: $header-text-color;
		background-color: $bg-color;
	}

	.header-overlay {
		display: block;
		width: 100%;
		height: 2.5rem;

		background-image: linear-gradient(
			rgba($bg-color, 1),
			cubic-bezier(0.75, 0, 1, 0.75),
			rgba($bg-color, 0)
		);
	}

	.game-wrapper {
		width: 100%;

		box-sizing: content-box;
		padding-top: 5rem;
		min-height: calc($top-distance - 5rem);
		padding-bottom: calc(100vh - $top-distance);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
	}
</style>
