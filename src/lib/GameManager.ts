import type { ConvergencePair } from './types';
import axios from 'axios';
import Utils from './Utils';

export interface GameInterfaceState {
	loading: boolean;
	errored: boolean;
	winQuality: number;
}

export default class GameManager {
	convergencePairs: ConvergencePair[] = [];
	private _currentRemoteWord: string;
	private _currentLocalWord: string;
	private _nextRemoteWord: string | null = null;
	private _pendingSubmission: string | null = null;
	private _pendingRequest = false;

	private _updateInterface: (state: GameInterfaceState) => void;

	constructor(firstRemoteWord: string, updateInterface: (state: GameInterfaceState) => void) {
		// todo: can these use the values from convergence pairs to simplify?
		this._currentLocalWord = '';
		this._currentRemoteWord = '';
		this._nextRemoteWord = firstRemoteWord;
		this.convergencePairs.push({
			local: '',
			remote: ''
		});
		this._updateInterface = updateInterface;
	}

	submitLocalWord(localWord: string) {
		if (this._nextRemoteWord) {
			// If we have the remote word ready, display it, and continue to request the next
			this.applyRemoteWord(this._nextRemoteWord);
			this._currentLocalWord = localWord;
			this._currentRemoteWord = this._nextRemoteWord;
			this._nextRemoteWord = null;
		} else {
			// Queue next submission if request is loading; continue to another request if it failed
			this._pendingSubmission = localWord;
			this._update(true, false, 0);
			if (this._pendingRequest) return;
		}

		// Make a request for the next remote word
		this._pendingRequest = true;
		GameManager.fetchRemoteWord(this._currentLocalWord, this._currentRemoteWord)
			.then((remoteWord) => {
				this._pendingRequest = false;
				this._nextRemoteWord = remoteWord;
				// If there is a pending submission, call submitLocalWord recursively
				if (this._pendingSubmission) {
					this.submitLocalWord(this._pendingSubmission);
					this._pendingSubmission = null;
				}
			})
			.catch(() => {
				this._pendingRequest = false;
				if (this._pendingSubmission) {
					this._update(false, true, 0);
				}
			});
	}

	private _update(loading = false, errored = false, winQuality = 0) {
		this._updateInterface({
			loading,
			errored,
			winQuality
		});
	}

	private applyRemoteWord(remoteWord: string) {
		const currPair = this.convergencePairs[this.convergencePairs.length - 1];
		currPair.remote = remoteWord;
		const winQuality = GameManager.winQuality(currPair.local, currPair.remote);
		if (winQuality == 0) this.convergencePairs.push({ local: '', remote: '' });
		this._update(false, false, winQuality);
	}

	// 0 = no win, 1 = partial win, 2 = full win
	private static winQuality(localWord: string, remoteWord: string): number {
		if (!localWord.length || !remoteWord.length) return 0;
		localWord = Utils.cleanString(localWord);
		remoteWord = Utils.cleanString(remoteWord);
		if (localWord === remoteWord) return 2;
		if (
			localWord.includes(remoteWord.substring(0, 3)) ||
			remoteWord.includes(localWord.substring(0, 3))
		)
			return 1;
		return 0;
	}

	private static async fetchRemoteWord(localWord: string, remoteWord: string): Promise<string> {
		const result = await axios.get('/api/converge', {
			params: {
				word1: Utils.cleanString(localWord),
				word2: remoteWord
			}
		});
		return result.data;
	}
}
