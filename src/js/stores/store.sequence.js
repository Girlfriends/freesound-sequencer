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

const SampleSearchResultModel = types.model({
	id: types.identifier(),
	name: types.string,
	imageURL: types.string,
	previewURL: types.string,
	downloadURL: types.string
});

const SequenceModel = types.model({
	id: types.identifier(),
	activeSample: types.string,
	pulses: types.array(SequencePulseModel),
	sampleSearch: types.optional(types.string, ""),
	searchResults: types.array(SampleSearchResultModel)
}).actions(self => {
	return {
		setActiveSample: (sample) => {
			self.activeSample = sample;
		},

		setSearchResults: (results) => {
			self.searchResults = [];
			results.forEach((result) => {
				const resultModel = SampleSearchResultModel.create({
					id: (result.id).toString(),
					name: result.name,
					imageURL: result.images.waveform_m,
					previewURL: result.previews["preview-lq-ogg"],
					downloadURL: result.download
				});
				self.searchResults.push(resultModel);
			});
		},

		setSearchText: (text) => {
			self.sampleSearch = text;
		}
	}
}).views(self => ({
	pulseIsOnsetAtStep(step) {
		if (step < 0 || step >= self.pulses.length) return false;
		return self.pulses[step].onset;
	}
}));

export default SequenceModel;

export function createSequenceModel(size, sample, id) {
	const pulses = [];
	const searchResults = [];
	for (let i = 0; i < size; i++) {
		pulses.push(SequencePulseModel.create({ index: i }));
	}

	return SequenceModel.create({ pulses, activeSample:sample, id, searchResults });
}
