# Convergence

Convergence is a [fun improv game](https://www.learnimprov.com/convergence/) that you can now play with GPT! **This is a work in progress, stay tuned.**

## Todo

- Fix link styling throughout
- Animate the bottom padding of the main wrapper on game win: scroll whole game into view
- Bug: getting the same first remote word twice in a row (sometimes)
- GameManager internal state simplification
- Retry failed requests from GameManager?
- Get test for GameManager working (fix axios mocking or explore fetch)
- Placeholder text when entry field is unselected
- Better random starting word list (more words, not just nouns)
- About overlay w/ details & share link
- Prompt tuning
  - presence_penalty instead of asking for no repeats in prompt?
  - Experiment with system definition (instead of putting everything in 'user')
- Error page and/or redirect everything to home
- Automatically focus input when playing again

## Ideas

- Configurable difficulty
- Game history (local storage)
