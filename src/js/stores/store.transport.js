import { types } from 'mobx-state-tree';

const TransportModel = types.model({
	id: types.identifier(),
	playing: types.optional(types.boolean, false),
	maxPulseCount: types.optional(types.number, 16),
	activePulse: types.optional(types.number, -1)
}).actions(self => {
	function advancePulse() {
		self.activePulse = (self.activePulse + 1) % self.maxPulseCount;
	}

	function setPlaying(playing) {
		self.playing = playing;
	}

	return { advancePulse, setPlaying };
});

export default TransportModel;
