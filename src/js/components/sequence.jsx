import React from "react";
import Tone from 'tone';

const Cell = (props) => {
	let className = "cell";
	if (props.active) className += " active";
	if (props.onset) className += " onset";
	return <div className={className} onClick={props.onclick} />
};

export default class Sequence extends React.Component {
	constructor(props) {
		super(props);
		const cells = [];
		for (let i=0; i<16; i++) cells.push({
			active: false,
			onset: false
		});
		this.state = { cells };
		this._onClick = this._onClick.bind(this);
		this._player = new Tone.Player({
			autostart: false,
			loop: false
		}).toMaster();
		this._sequence = new Tone.Sequence((time, col) => {
			this.state.cells.forEach((cell, i) => {
				cell.active = (col === i);
				if (cell.active && cell.onset && this._player.buffer.loaded) this._player.start();
			});
			this.setState({ cells: this.state.cells });
		}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");
		Tone.Transport.start();
		this._sequence.start();
	}

	_onClick(idx) {
		this.state.cells[idx].onset = !this.state.cells[idx].onset;
		this.setState({
			cells: this.state.cells
		});
	}

	componentDidUpdate() {
		if (this.props.src) this._player.load(this.props.src);
	}

	render() {
		return (
			<div className="sequenceContainer">
			{
				this.state.cells.map((cell, i) => {
					return ( <Cell key={i} active={cell.active} onset={cell.onset} onclick={() => this._onClick(i)} /> )
				})
			}
			</div>
		);
	}
}