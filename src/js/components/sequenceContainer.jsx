import React from "react";
import Sequence from './sequence.jsx';

export default class SequenceContainer extends React.Component {
	render() {
		return (
			<div className="sequenceContainer">
				<Sequence store={this.props.store} index={0}/>
			</div>
		);
	}
}