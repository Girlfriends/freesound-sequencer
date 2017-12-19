import Tone from 'tone';
import { observe } from 'mobx';

export default class Engine {
	constructor(transportStore) {
		this._transportStore = transportStore;
		this._stepSequence = new Tone.Sequence(() => {
			transportStore.advancePulse();
		}, [0], "16n");
		Tone.Transport.start();

		this._onPlayStateChange = this._onPlayStateChange.bind(this);

		this.unsubscribes = [
			observe(this._transportStore, "playing", (change) => this._onPlayStateChange(change.newValue))
		];
	}

	_onPlayStateChange(playing) {
		if (playing) this._stepSequence.start();
		if (!playing) this._stepSequence.stop();
	}
}