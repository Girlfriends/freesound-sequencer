import { types } from 'mobx-state-tree';

const InterfaceModel = types.model({
	id: types.identifier(),
	activeSequence: types.optional(types.number, 0),
	sampleSearchFocused: types.optional(types.boolean, false)
}).actions(self => ({
	setActiveSequence(sequenceIndex) {
		self.activeSequence = sequenceIndex;
	},

	setSampleSearchFocused(focused) {
		self.sampleSearchFocused = focused;
	}
}));

export default InterfaceModel;

