import React from "react";
import { inject, observer } from 'mobx-react';

const SequencePickerButton = inject("store")(observer((props) => {
	const active = props.store.interface.desiredSequence === props.idx;
	const activePulse = props.store.transport.activePulse;
	const blinking = props.store.sequences[props.idx].pulseIsOnsetAtStep(activePulse);
	const classes = "sequencePickerButton" + (active ? " active" : "") + (blinking ? " blinking" : "");
	return ( 
		<div
			className={classes}
			onTouchStart ={() => props.onPointerDown(props.idx)}
			onMouseDown={() => props.onPointerDown(props.idx)}
		></div>
	);
}));

@inject("store")
@observer export default class SequencerPicker extends React.Component {
	_onPointerDown = (idx) => {
		console.log("Picking sequence with index " + idx);
		this.props.store.interface.setDesiredSequence(idx); 
	};

	render() {
		const buttons = this.props.store.sequences.map((sequence, idx) => {
			return <SequencePickerButton
				onPointerDown={this._onPointerDown.bind(this)}
				idx={idx}
				key={idx}
			/>
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

