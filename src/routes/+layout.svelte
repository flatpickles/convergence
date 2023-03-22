<script lang="ts">
	import '../app.scss';
</script>

<div class="wrapper">
	<slot />
</div>

<style lang="scss">
	$test-bg: #f00;

	.wrapper {
		background-color: $test-bg;
	}
</style>
