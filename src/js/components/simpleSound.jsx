import React from "react";
import freesound from '../freesound.js/freesound.js';

export default class SimpleSound extends React.Component {
	render() {
		return (
			<div>
				<p>{ "This is the sound of a " + this.props.src }</p>
			</div>
		);
	}
}