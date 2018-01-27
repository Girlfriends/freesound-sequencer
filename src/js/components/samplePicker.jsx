import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';
import Tone from 'tone';

@inject ('store')
@observer class SamplePicker extends Component {
	render() {
		let className = "sample-picker";
		if (this.props.store.interface.sampleSearchFocused) {
			className += " sample-picker-focused";
		}
		return (
			<CSSTransition
				in={this.props.store.interface.sampleSearchFocused}
				timeout={5000}
				classNames="sample-picker"
			>
				<div
					id='startContextDiv'
					className={className}
					onClick={ () => {
							this.props.store.transport.setPlaying(!this.props.store.transport.playing);
							console.log("Playing: " + this.props.store.transport.playing);
							// this.props.store.interface.sampleSearchFocused = true;
						}
					} >
				</div>
			</CSSTransition>
		)
	}
}

export default SamplePicker;