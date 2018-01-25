import React from "react";
import SequenceContainer from './sequenceContainer.jsx';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer export default class SequenceListContainer extends React.Component {
	_rendercounter = 0;
	_synchronizeStateOnAnimationEnd = () => {
		this.props.store.interface.followSequenceQueue();
	};

	render() {
		const nextSequenceIdx = this.props.store.interface.nextSequence;
		const activeSequenceIdx = this.props.store.interface.activeSequence;
		const nextSequence = this.props.store.sequences[nextSequenceIdx];
		const activeSequence = this.props.store.sequences[activeSequenceIdx];
		let topClasses = "sequenceTop";
		let centerClasses = "sequenceActive";
		let bottomClasses = "sequenceBottom";
		if (nextSequenceIdx > activeSequenceIdx) {
			centerClasses += " slideBottomIn-" + this._rendercounter;
			bottomClasses += " slideBottomIn-" + this._rendercounter;
		} else if (nextSequenceIdx < activeSequenceIdx) {
			centerClasses += " slideTopIn-" + this._rendercounter;
			topClasses += " slideTopIn-" + this._rendercounter;
		}
		const sequenceContainers = [
			<SequenceContainer sequence={nextSequence} columns={4} extraClasses={topClasses} key={"top"} />,
			<SequenceContainer
				sequence={activeSequence}
				columns={4}
				extraClasses={centerClasses}
				animationEnd={this._synchronizeStateOnAnimationEnd}
				key={"active"}
			/>,
			<SequenceContainer sequence={nextSequence} columns={4} extraClasses={bottomClasses} key={"bottom"} />
		];
		this._rendercounter = (this._rendercounter + 1) % 2;
		return (
			<div className="sequenceListContainer">
				{ sequenceContainers }
			</div>
		);
	}
}