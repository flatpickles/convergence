import { describe, beforeEach, afterEach, expect, it, vi, type MockedFunction } from 'vitest';
import GameManager from '../lib/GameManager';
import axios from 'axios';

const firstRemoteWord = 'orbit';
vi.mock('axios', () => ({
	default: {
		get: vi.fn()
	}
}));

describe('GameManager', () => {
	let gameManager: GameManager;
	const updateUI = vi.fn();
	const alertLoading = vi.fn();
	const alertError = vi.fn();

	beforeEach(() => {
		gameManager = new GameManager(firstRemoteWord, updateUI, alertLoading, alertError);
		(axios.get as MockedFunction<typeof axios.get>).mockReset();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('initializes with one pair (empty)', () => {
		expect(gameManager.convergencePairs.length).toBe(1);
	});

	it('applies the first words', () => {
		const firstLocalWord = 'pants';
		gameManager.submitLocalWord(firstLocalWord);
		expect(gameManager.convergencePairs[0].user).toBe(firstLocalWord);
		expect(gameManager.convergencePairs[0].gpt).toBe(firstRemoteWord);
	});

	// Mocking fuckery - this doesn't work for some reason :(

	// it('applies the second words', () => {
	// 	const firstLocalWord = 'pants';
	// 	const secondLocalWord = 'shirt';
	// 	const secondRemoteWord = 'dog';
	// 	(axios.get as MockedFunction<typeof axios.get>).mockReset().mockResolvedValue({
	// 		data: secondRemoteWord
	// 	});
	// 	gameManager.submitLocalWord(firstLocalWord);
	// 	expect(axios.get).toHaveBeenCalledTimes(1);
	// 	gameManager.submitLocalWord(secondLocalWord);
	// 	expect(gameManager._convergencePairs[1].gpt).toBe(secondLocalWord);
	// });
});
