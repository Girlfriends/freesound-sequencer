import React from "react";
import { inject, observer } from 'mobx-react';

@inject("store")
@observer export default class SequencerPicker extends React.Component {
	render() {
		const buttons = this.props.store.sequences.map((sequence, idx) => {
			return ( 
				<div
					className="sequencePickerButton"
					onClick={ () => {
						console.log("Picking sequence with index " + idx);
						this.props.store.interface.setActiveSequence(idx); 
					}}
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