<script lang="ts">
	export let visible = false;
	$: visibleUpdated(visible);

	function visibleUpdated(visible: boolean) {
		// This is hacky and I'm not proud of it
		// Overlay needs to be scrollable but also show up at the top of the page...
		if (typeof window !== 'undefined') window.scrollTo(0, visible ? 0 : document.body.scrollHeight);
	}
</script>

<section class="about" class:visible>
	<div class="about-contents">
		<p>
			Convergence is a
			<a href="https://www.learnimprov.com/convergence/">classic improv game</a> for two or more players.
			In the two-player version, the players each think of a random word, count down from three, and
			shout their word at the same time. Then, each player thinks of a new word that somehow connects
			the last two words, and again, count down and shout their word. This continues until the players
			"converge" upon the same word, at which point the game is won!
		</p>
		<p>
			This app lets you play games of Convergence with
			<a href="https://platform.openai.com/docs/models/gpt-3-5">gpt-3.5-turbo</a>, a large language
			model from OpenAI. The gameplay works as you might expect: type a word, press enter, and then
			try to converge with GPT in as few guesses as possible! It's worth noting that the GPT player
			will avoid re-guessing a word from the most recent two, but it's allowed to guess words used
			earlier in the game.
		</p>
		<p>
			While GPT is great at Convergence and makes a fantastic playmate, please keep in mind that
			everything is more fun with real humans. Get some practice here, then convince a few friends
			to play Convergence with you in person! I promise you won't be disappointed.
		</p>
		<p>
			Made with love by <a href="https://flatpickles.com">Matt Nichols</a>. Source code
			<a href="https://github.com/flatpickles/convergence">here!</a>
		</p>
	</div>
</section>

<style lang="scss">
	.about {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: calc($header-height * 1.5);
		margin-bottom: 10rem;
		background-color: $bg-color;
		z-index: 1;
		overflow-y: scroll;

		display: none;
		flex-direction: row;
		justify-content: center;

		pointer-events: none;
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	.about::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.about {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.about.visible {
		display: flex;
		opacity: 100%;
		pointer-events: all;
	}

	.about-contents {
		display: block;
		max-width: 40rem;
		padding: 0.75rem 1rem;
		margin: 0rem 1rem 1rem;
		font-size: $small-text-size;
		border: 1px solid black;
		border-radius: 0.25rem;
		text-align: justify;
		background-color: rgba(0, 0, 0, 3%);
	}
</style>
