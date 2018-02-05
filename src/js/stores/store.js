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

const initialSoundURLs = [
	'static/snd/147700__clueless-inc__abd05.wav',
	'static/snd/147701__clueless-inc__ahh01.wav',
	'static/snd/147703__clueless-inc__asd06.wav',
	'static/snd/147704__clueless-inc__asd07.wav',
	'static/snd/147705__clueless-inc__aprc07.wav',
	'static/snd/147708__clueless-inc__aprc06.wav',
	'static/snd/147709__clueless-inc__asd03.wav',
	'static/snd/147712__clueless-inc__asd02.wav'
];
let sequences = Array(8);
sequences = _.map(sequences, (v, k) => createSequenceModel(16, initialSoundURLs[k], `${k}`));

const store = FreesoundModel.create({
	authentication: AuthModel.create({ id: "0" }),
	interface: InterfaceModel.create({ id: "0 "}),
	sequences,
	transport: TransportModel.create({ id: "0" }),
});

export default store;