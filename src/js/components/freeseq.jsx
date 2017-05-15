import React from "react";
import SimpleSound from './simpleSound.jsx';

export default class FreesoundSequencer extends React.Component {
	render() {
		return (
			<div>
				<p>{ "Indeed, there is an app here" }</p>
				<SimpleSound src="moose" />
				<SimpleSound src="cat" />
				<SimpleSound src="bird" />
			</div>
		)
	}
}


