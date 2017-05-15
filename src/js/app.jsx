import React from "react";
import ReactDOM from "react-dom";

// Components
import FreesoundSequencer from "./components/freeseq.jsx";

function init(options) {
	ReactDOM.render(
		<FreesoundSequencer {...options} />,
		options.element
	);
}

export default {
	init
};