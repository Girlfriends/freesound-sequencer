import Tone from 'tone';
import { observable, autorun } from 'mobx';
import _ from 'lodash';
import StartAudioContext from 'startaudiocontext';

export default class Engine {
	@observable initialized = false;

	constructor(store) {
		const self = this;
		this._auth = store.authentication;
		this._transportStore = store.transport;
		this._sequences = store.sequences;

		this._players = [];
		_.forEach(self._sequences, (seq, k) => {
			this._players.push(new Tone.Player().toMaster());
		});

		this._stepSequence = new Tone.Sequence((time, col) => {
			self._transportStore.advancePulse();
			const activePulse = self._transportStore.activePulse;
			_.forEach(self._players, (player, k) => {
				if (player.loaded) {
					const seq = self._sequences[k];
					if (seq.pulses[activePulse].onset) {
						player.start(time);
					}
				}
			});
		}, [0, 0, 0, 0, 0, 0, 0, 0], "16n");

		this._initialize = this._initialize.bind(this);
		this._onPlayStateChange = this._onPlayStateChange.bind(this);
		this._onSampleStateChange = this._onSampleStateChange.bind(this);
		autorun(this._onPlayStateChange);
		autorun(this._onSampleStateChange);
	}

	_initialize() {
		StartAudioContext(Tone.context, '#startContextDiv');
		Tone.Transport.start();
		this.initialized = true;
	}

	_onPlayStateChange() {
		const playing = this._transportStore.playing;
		if (playing) {
			if (!this._initialized) this._initialize()
			this._stepSequence.start();
		}
		if (!playing) {
			this._stepSequence.stop();
		}
	}

	_onSampleStateChange(change) {
		_.forEach(this._players, (player, k) => {
			const sampleURL = this._sequences[k].activeSample
			if (player.url !== sampleURL) {
				player.buffer.load(sampleURL, null, null, {
					headers: {
						Authorization: `Bearer ${this._auth.accessToken}`
					}
				});
			}
		});
	}
}
