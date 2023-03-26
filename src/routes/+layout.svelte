<script lang="ts">
	import 'ress';
	import '../app.scss';
</script>

<section class="header-wrapper">
	<div class="header">
		<h1>Convergence</h1>
		<h2>(?)</h2>
	</div>
	<div class="header-overlay" />
</section>

<slot />

<style lang="scss">
	h1 {
		font-size: 2rem;
	}

	.header-wrapper {
		position: absolute;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: 0.25rem 0.25rem 0rem;
		background-color: $bg-color;
	}

	.header-overlay {
		display: block;
		width: 100%;
		height: 4rem;

		background-image: linear-gradient(
			rgba($bg-color, 1),
			cubic-bezier(0.25, 0, 1, 0.75),
			rgba($bg-color, 0)
		);
	}
</style>
