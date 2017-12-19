import { action, observable } from 'mobx';

class SequencePulse {
	@observable onset = false;

	@action toggleOnset() {
		this.onset = !this.onset;
	}

	constructor(index) {
		this.index = index;
	}
}

export default class SequenceStore {
	pulses = [];

	constructor(size) {
		for (let i=0; i<size; i++) {
			this.pulses.push(new SequencePulse(i));
		}
	}
}