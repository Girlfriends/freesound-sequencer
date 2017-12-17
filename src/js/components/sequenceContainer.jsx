import React from "react";
import Sequence from './sequence.jsx';

export default class SequenceContainer extends React.Component {
	render() {
		return (
			<div className="sequenceContainer">
				<Sequence sequence={this.props.sequence} columns={this.props.columns} />
			</div>
		);
	}
}