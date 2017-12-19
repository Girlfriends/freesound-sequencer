import { action, observable } from 'mobx';

export default class TransportStore {
	@observable playing = false;
	@observable maxPulseCount = 16;
	@observable activePulse = -1

	@action advancePulse() {
		this.activePulse = (this.activePulse + 1) % this.maxPulseCount;
	}
}
