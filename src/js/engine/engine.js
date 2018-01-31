import Tone from 'tone';
import { observable, autorun } from 'mobx';
import _ from 'lodash';
import StartAudioContext from 'startaudiocontext';

export default class Engine {
	@observable initialized = false;

	constructor(store) {
		const self = this;
		const notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3'];
		this._transportStore = store.transport;
		this._sequences = store.sequences;
		this._stepSequence = new Tone.Sequence((time, col) => {
			self._transportStore.advancePulse();
			const activePulse = self._transportStore.activePulse;
			if (self._sampler.loaded) {
				_.forEach(self._sequences, (seq, idx) => {
					if (seq.pulses[activePulse].onset) {
						self._sampler.triggerAttack(notes[idx], time, 1);
					}
				})
			}
		}, [0, 0, 0, 0, 0, 0, 0, 0], "16n");

		this._sampler = new Tone.Sampler({
			'C3': 'static/snd/147700__clueless-inc__abd05.wav',
			'C#3' : 'static/snd/147701__clueless-inc__ahh01.wav',
			'D43' : 'static/snd/147703__clueless-inc__asd06.wav',
			'D#3' : 'static/snd/147704__clueless-inc__asd07.wav',
			'E3' : 'static/snd/147705__clueless-inc__aprc07.wav',
			'F3' : 'static/snd/147708__clueless-inc__aprc06.wav',
			'F#3' : 'static/snd/147709__clueless-inc__asd03.wav',
			'G3' : 'static/snd/147712__clueless-inc__asd02.wav'
		}).toMaster();

		this._initialize = this._initialize.bind(this);
		this._onPlayStateChange = this._onPlayStateChange.bind(this);
		autorun(this._onPlayStateChange);
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
}
