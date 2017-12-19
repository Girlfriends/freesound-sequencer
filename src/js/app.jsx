import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import FreesoundStore from "./stores/store.js";
import Engine from './engine/engine.js';

// Components
import FreesoundSequencer from "./components/freeseq.jsx";

function init(options) {
	const store = new FreesoundStore();
	const engine = new Engine(store.transport);
	store.transport.playing = true;
	store.authentication.parseLocationForAuth();
	ReactDOM.render(
		<Provider store={store} engine={engine} >
			<FreesoundSequencer {...options}/>
		</Provider>,
		options.element
	);
}

export default {
	init
};