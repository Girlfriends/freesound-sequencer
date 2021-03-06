import React from "react";
import { inject, observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';

const Cell = inject('store')(observer((props) => {
	let className = "sequence-cell";
	let overlayClassName = "sequence-cell-overlay";
	const active = props.store.transport.activePulse === props.cell.index;
	const onset = props.cell.onset;
	if (active) className += " active";
	if (onset) className += " onset";
	if (active) overlayClassName += " active";
	return (
		<div className="sequence-cell-container">
			<CSSTransition
				in={active}
				timeout={5000}
				classNames="sequence-cell"
			>
				<div className={className} onTouchStart={props.cellClick} />
			</CSSTransition>
			<div className={overlayClassName} />
		</div>
	);
}));

const SequenceRow = (props) => {
	return (
		<div className="sequenceRow">
			{
				props.cells.map((cell, index) => {
					return (
						<Cell
							key={index}
							cell={cell}
							cellClick={() => props.cellClick(index)}
						/>
					)
				})
			}
		</div>
	);
};

export default class Sequence extends React.Component {
	constructor(props) {
		super(props);
		this._onCellClick = this._onCellClick.bind(this);
	}

	_onCellClick(rowIndex, cellIndex) {
		const sequenceIndex = rowIndex * this.props.columns + cellIndex;
		this.props.sequence.pulses[sequenceIndex].toggleOnset();
	}

	render() {
		const pulses = this.props.sequence.pulses;
		const rowCount = Math.ceil(pulses.length / this.props.columns);
		let rowOffsets = [];
		for (let i=0; i<rowCount; i++) { rowOffsets.push(i * this.props.columns ) }

		return (
			<div className="sequence-aspect">
				<div className="sequence">
					{
						rowOffsets.map((index, rowIndex) => {
							return <SequenceRow
											cells={pulses.slice(index, index + this.props.columns)}
											key={rowIndex}
											cellClick={(cellIndex) => this._onCellClick(rowIndex, cellIndex)} />
						})
					}
				</div>
			</div>
		);
	}
}