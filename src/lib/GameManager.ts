import type { ConvergencePair } from './types';
import axios from 'axios';

export default class GameManager {
	convergencePairs: ConvergencePair[] = [];
	private _currentRemoteWord: string;
	private _currentLocalWord: string;
	private _nextRemoteWord: string | null = null;
	private _pendingSubmission: string | null = null;
	private _pendingRequest = false;

	_updateUI: () => void;
	_alertLoading: (loading: boolean) => void;
	_alertError: (error: boolean) => void;

	constructor(
		firstRemoteWord: string,
		updateUI: () => void,
		alertLoading: (loading: boolean) => void,
		alertError: (error: boolean) => void
	) {
		// todo: can these use the values from convergence pairs to simplify?
		this._currentLocalWord = '';
		this._currentRemoteWord = '';
		this._nextRemoteWord = firstRemoteWord;
		this.convergencePairs.push({
			user: '',
			gpt: ''
		});
		this._updateUI = updateUI;
		this._alertLoading = alertLoading;
		this._alertError = alertError;
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
			this._alertLoading(true);
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
					this._alertError(true);
				}
			});
	}

	private applyRemoteWord(remoteWord: string) {
		this._alertError(false);
		this._alertLoading(false);

		this.convergencePairs[this.convergencePairs.length - 1].gpt = remoteWord;
		this.convergencePairs.push({ user: '', gpt: '' });
		this._updateUI();
	}

	private static async fetchRemoteWord(localWord: string, remoteWord: string): Promise<string> {
		return axios
			.get('/api/converge', {
				params: {
					word1: localWord,
					word2: remoteWord
				}
			})
			.then((res) => {
				return res.data;
			});
	}
}
