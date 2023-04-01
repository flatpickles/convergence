<script lang="ts">
	export let visible = false;
</script>

<section class="about" class:visible>
	<div class="about-contents">
		<p>
			Convergence is a
			<a href="https://www.learnimprov.com/convergence/">classic improv game</a> for two or more players.
			In this game, two players each think of a random word, count down from three, and shout their word
			at the same time. Then, each player thinks of a new word that somehow connects the last two words,
			and again, two players count down from three and shout their word at the same time. This continues
			until two players "converge" upon the same word, at which point the game is won.
		</p>
		<p>
			You can now play Convergence right here in your browser! This app lets you play games of
			Convergence with <a href="https://platform.openai.com/docs/models/gpt-3-5">gpt-3.5-turbo</a>,
			a large language model from OpenAI. The gameplay works as described above; give it a shot, and
			you'll get a feel for it. It's worth noting that the GPT player will never guess a word that's
			the same as one of the last pair of words, but it's allowed to guess words used earlier in the
			game.
		</p>
		<p>
			While GPT is great at Convergence and makes a fantastic playmate, please keep in mind that
			everything is more fun with real humans. Get some practice in here, then convince a few
			friends to try playing Convergence with you in person! I promise you won't be disappointed.
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
		padding-top: $header-height * 2;
		margin-bottom: 10rem;
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
		display: block;
		max-width: 42rem;
		padding: 0 1rem;
		padding-bottom: 1rem;
		font-size: $small-text-size;
	}
</style>
