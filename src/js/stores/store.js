import { types } from 'mobx-state-tree';
import AuthModel from './store.auth.js';
import InterfaceModel from './store.interface.js';
import SequenceModel, { createSequenceModel } from './store.sequence.js';
import TransportModel from './store.transport.js';
import _ from 'lodash';

const FreesoundModel = types.model({
	authentication: types.reference(AuthModel),
	interface: types.reference(InterfaceModel),
	sequences: types.array(SequenceModel),
	transport: types.reference(TransportModel)
});

let sequences = Array(8);
sequences = _.map(sequences, (v, k) => createSequenceModel(16, `${k}`));

const store = FreesoundModel.create({
	authentication: AuthModel.create({ id: "0" }),
	interface: InterfaceModel.create({ id: "0 "}),
	sequences,
	transport: TransportModel.create({ id: "0" }),
});

export default store;