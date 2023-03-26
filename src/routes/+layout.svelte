<script lang="ts">
	import 'ress';
	import '../app.scss';
</script>

<div class="wrapper">
	<div class="header">
		<h1>Convergence</h1>
		<h2>(?)</h2>
	</div>
	<slot />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: 0.25rem;

		background-image: linear-gradient(
			rgba(0, 0, 0, 0.75),
			cubic-bezier(0.25, 0, 0.75, 1),
			rgba(0, 0, 0, 0)
		);
	}
</style>
