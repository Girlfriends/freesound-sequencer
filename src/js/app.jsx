import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import FreesoundStore from "./stores/store.js";

// Components
import FreesoundSequencer from "./components/freeseq.jsx";

function init(options) {
	const store = new FreesoundStore();
	store.authentication.parseLocationForAuth();
	options.store = store;
	ReactDOM.render(
		<Provider store={store}>
			<FreesoundSequencer {...options}/>
		</Provider>,
		options.element
	);
}

export default {
	init
};