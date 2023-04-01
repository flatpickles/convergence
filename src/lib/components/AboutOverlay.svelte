<script lang="ts">
	export let visible = false;
</script>

<section class="about" class:visible>
	<div class="about-contents">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</div>
</section>

<style lang="scss">
	.about {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding-top: $header-height * 2;
		background-color: $bg-color;
		z-index: 1;

		display: flex;
		flex-direction: row;
		justify-content: center;

		pointer-events: none;
		opacity: 0%;
		transition: $about-transition-time;
	}

	.about.visible {
		opacity: 100%;
		pointer-events: all;
	}

	.about-contents {
		max-width: 42rem;
		padding: 0 1rem;
		font-size: 1.2em;
	}
</style>
