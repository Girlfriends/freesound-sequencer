import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';

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
					className={className}
					onClick={ () => {
							this.props.store.interface.sampleSearchFocused = true;
						}
					} >
				</div>
			</CSSTransition>
		)
	}
}

export default SamplePicker;