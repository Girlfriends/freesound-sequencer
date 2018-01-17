import { types } from 'mobx-state-tree';

const InterfaceModel = types.model({
	id: types.identifier(),
	sampleSearchFocused: types.optional(types.boolean, false)
});

export default InterfaceModel;

