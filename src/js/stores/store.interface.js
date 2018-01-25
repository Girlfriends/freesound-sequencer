import { types } from 'mobx-state-tree';

const InterfaceModel = types.model({
	id: types.identifier(),
	activeSequence: types.optional(types.number, 0),
	nextSequence: types.optional(types.number, 0),
	desiredSequence: types.optional(types.number, 0),
	sampleSearchFocused: types.optional(types.boolean, false)
}).actions(self => ({
	followSequenceQueue() {
		self.activeSequence = self.nextSequence;
		if (self.nextSequence !== self.desiredSequence) {
			self.nextSequence = self.desiredSequence;
		}
	},

	setActiveSequence(sequenceIndex) {
		self.activeSequence = sequenceIndex;
	},

	setNextSequence(sequenceIndex) {
		self.nextSequence = sequenceIndex;
	},

	setDesiredSequence(sequenceIndex) {
		self.desiredSequence = sequenceIndex;
		if (self.activeSequence === self.nextSequence) {
			self.nextSequence = sequenceIndex;
		}
	},

	setSampleSearchFocused(focused) {
		self.sampleSearchFocused = focused;
	}
}));

export default InterfaceModel;

