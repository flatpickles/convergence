<script lang="ts">
	import 'ress';
	import '../app.scss';
</script>

<div class="wrapper">
	<slot />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
