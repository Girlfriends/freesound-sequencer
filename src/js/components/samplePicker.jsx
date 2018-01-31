import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';
import Tone from 'tone';
const freesound = require('../freesound.js/freesound.js');

@inject ('store')
@observer class SamplePicker extends Component {

	constructor(props) {
		super(props);
		this._handleChange = this._handleChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleChange (event) {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
		activeSample.setSearchText(event.target.value);
	}

	_handleSubmit (event) {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
		freesound.setToken(this.props.store.authentication.accessToken);
		freesound.textSearch(activeSample.sampleSearch, {}, function (thing) {
			console.log(thing);
		});
		event.preventDefault();
	}

	render() {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
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
							this.props.store.interface.setSampleSearchFocused(true);
						}
					} >
					<form onSubmit={this._handleSubmit} >
						<label>
							Search:
							<input type="text" value={activeSample.sampleSearch} onChange={this._handleChange} />
						</label>
					</form>
				</div>
			</CSSTransition>
		)
	}
}

export default SamplePicker;