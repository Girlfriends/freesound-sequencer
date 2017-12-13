import { action, observable } from 'mobx';

class SequencePulse {
	@observable active = false;
	@observable onset = false;

	@action toggleOnset() {
		this.onset = !this.onset;
	}
}

export default class SequenceStore {
	pulses = [];

	constructor(size) {
		for (let i=0; i<size; i++) {
			this.pulses.push(new SequencePulse);
		}
	}
}