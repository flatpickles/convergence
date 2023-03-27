# Convergence

Convergence is a [fun improv game](https://www.learnimprov.com/convergence/) that you can now play with GPT! **This is a work in progress, stay tuned.**

## Todo

- Win state!
- GameManager internal state simplification
- GameManager -> page updates streamlining (one UI update function?)
- Retry failed requests from GameManager?
- Get test for GameManager working (fix axios mocking or explore fetch)
- Placeholder text when entry field is unselected
- Normalize & validate input text (lowercase, dictionary check, etc)
- Handle errors on client (retry button maybe)
- Better random starting word list (more words, not just nouns)
- About overlay w/ details & share link
- Prompt tuning
  - Prompt tweaks: also categorical relationships... etc
  - Temperature: 2
  - presence_penalty instead of asking for no repeats in prompt?
  - Experiment with system definition (instead of putting everything in 'user')
  - Fine tuning?
- Error page and/or redirect everythign to home

## Ideas

- Configurable difficulty
- Game history (local storage)
