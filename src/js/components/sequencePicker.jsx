import React from "react";
import { inject, observer } from 'mobx-react';

@inject("store")
@observer export default class SequencerPicker extends React.Component {
	_onPointerDown = (idx) => {
		console.log("Picking sequence with index " + idx);
		this.props.store.interface.setDesiredSequence(idx); 
	};

	render() {
		const buttons = this.props.store.sequences.map((sequence, idx) => {
			return ( 
				<div
					className="sequencePickerButton"
					onTouchStart ={() => this._onPointerDown(idx)}
					onMouseDown={() => this._onPointerDown(idx)}
					key={sequence.id}
				></div>
			);
		});
		return (
			<div className="sequencePicker">
				<div className="sequencePickerButtonContainer">
					{buttons}
				</div>
			</div>
		);
	}
}

