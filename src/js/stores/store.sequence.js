import { types } from 'mobx-state-tree';

const SequencePulseModel = types.model({
	index: types.optional(types.number, 0),
	onset: types.optional(types.boolean, false)
}).actions(self => {
	function toggleOnset() {
		self.onset = !self.onset;
	}

	return { toggleOnset };
});

const SequenceModel = types.model({
	id: types.identifier(),
	pulses: types.array(SequencePulseModel)
});

export default SequenceModel;

export function createSequenceModel(size, id) {
	const pulses = [];
	for (let i = 0; i < size; i++) {
		pulses.push(SequencePulseModel.create({ index: i }));
	}

	return SequenceModel.create({ pulses, id });
}
