import AuthStore from './store.auth.js';
import InterfaceStore from './store.interface.js';
import SequenceStore from './store.sequence.js';
import TransportStore from './store.transport.js';

export default class FreesoundStore {
	authentication = new AuthStore();
	interface = new InterfaceStore();
	sequences = [
		new SequenceStore(16),
		new SequenceStore(16),
		new SequenceStore(16),
		new SequenceStore(16)
	];
	transport = new TransportStore();
}