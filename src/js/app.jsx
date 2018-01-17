import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import store from "./stores/store.js";
import Engine from './engine/engine.js';

// Components
import FreesoundSequencer from "./components/freeseq.jsx";

function init(options) {
	const engine = new Engine(store);
	store.authentication.parseLocationForAuth();
	ReactDOM.render(
		<Provider store={store} engine={engine} >
			<FreesoundSequencer {...options}/>
		</Provider>,
		options.element
	);
	// store.transport.playing = true;
}

export default {
	init
};