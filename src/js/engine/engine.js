import Tone from 'tone';
import { observe } from 'mobx';

export default class Engine {
	constructor(store) {
		const self = this;
		this._transportStore = store.transport;
		this._sequences = store.sequences;
		this._stepSequence = new Tone.Sequence((time, col) => {
			// alert(time);
			self._transportStore.advancePulse();
			const activePulse = self._transportStore.activePulse;
			if (self._sampler.loaded &&
				self._sequences[0].pulses[activePulse].onset) {
				self._sampler.triggerAttack('C3', time, 1);
			}
		}, [0, 0, 0, 0, 0, 0, 0, 0], "8n");

		this._sampler = new Tone.Sampler({
			'C3': 'static/snd/147703__clueless-inc__asd06.wav'
		}).toMaster();

		this._stepSequence.start("0:0:0");

		this._onPlayStateChange = this._onPlayStateChange.bind(this);

		this.unsubscribes = [
			observe(this._transportStore, "playing", (change) => this._onPlayStateChange(change.newValue))
		];
	}

	_onPlayStateChange(playing) {
		if (playing) Tone.Transport.start();
		if (!playing) Tone.Transport.stop();
	}
}
