import React from "react";

const Cell = (props) => {
	let className = "sequenceCell";
	if (props.active) className += " active";
	if (props.onset) className += " onset";
	return <div className={className} onClick={props.onclick} />
};

const SequenceRow = (props) => {
	return (
		<div className="sequenceRow">
			{
				props.cells.map((cell, i) => {
					return <Cell
									key={i}
									classname="sequenceCell"
									active={false}
									onset={false}
									onclick={() => console.log("hi" + cell.index)}
								/>
				})
			}
		</div>
	);
};

export default class Sequence extends React.Component {
	constructor(props) {
		super(props);
		const rows = [];
		for (let i=0; i<16; i++) {
			const c = {active: false, onset: false, index: i};
			if (i % 4 == 0) {
				rows.push([]);
			}
			const row = rows[rows.length - 1];
			row.push(c);
		}
		this.state = { rows };
		this._onClick = this._onClick.bind(this);
	}

	_onClick(idx) {
		console.log(idx);
	}

	render() {
		return (
			<div className="sequence">
			{
				this.state.rows.map((row, r) => {
					return <SequenceRow cells={row} key={r}/>
				})
			}
			</div>
		);
	}
}