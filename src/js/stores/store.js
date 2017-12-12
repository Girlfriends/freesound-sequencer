import AuthStore from './store.auth.js';
import SequenceStore from './store.sequence.js';

export default class FreesoundStore {
	authentication = new AuthStore();
	sequences = [
		new SequenceStore(16),
		new SequenceStore(16),
		new SequenceStore(16),
		new SequenceStore(16)
	];
}