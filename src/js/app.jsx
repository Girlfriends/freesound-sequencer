import React from 'react'
import ReactDOM from "react-dom";
import FreesoundStore from "./stores/store.js";

// Components
import FreesoundSequencer from "./components/freeseq.jsx";

function init(options) {
	const store = new FreesoundStore();
	store.authentication.parseLocationForAuth();
	options.store = store;
	ReactDOM.render(
		<FreesoundSequencer {...options}/>,
		options.element
	);
}

export default {
	init
};