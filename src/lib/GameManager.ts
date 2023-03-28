import type { ConvergencePair } from './types';
import axios from 'axios';

export interface GameInterfaceState {
	loading: boolean;
	errored: boolean;
	won: boolean;
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
			this._update(true, false, false);
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
					this._update(false, true, false);
				}
			});
	}

	private _update(loading = false, errored = false, won = false) {
		this._updateInterface({
			loading,
			errored,
			won
		});
	}

	private applyRemoteWord(remoteWord: string) {
		const currPair = this.convergencePairs[this.convergencePairs.length - 1];
		currPair.remote = remoteWord;
		this.convergencePairs.push({ local: '', remote: '' });
		this._update(false, false, currPair.local.toLowerCase() === currPair.remote);
	}

	private static async fetchRemoteWord(localWord: string, remoteWord: string): Promise<string> {
		const result = await axios.get('/api/converge', {
			params: {
				word1: localWord,
				word2: remoteWord
			}
		});
		return result.data;
	}
}
