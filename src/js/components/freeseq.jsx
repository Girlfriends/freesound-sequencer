import React from "react";
import SamplePicker from './samplePicker.jsx';
import SequenceListContainer from './sequenceListContainer.jsx';
import SequencePicker from './sequencePicker.jsx';
import Tone from 'tone';
import { inject, observer } from 'mobx-react';

const AuthOverlay = (props) => {
	return (
		<div
			className="authenticationOverlay"
			onClick={ props.store.authentication.authorize }
		>
			<h1> Welcome to the Freesound Sequencer! </h1>
			<h2> Tap anywhere to authorize with your Freesound Account </h2>
		</div>
	)
}

const AudioContextOverlay = (props) => {
	return (
		<div
			id="startContextDiv"
			className="audioStartOverlay"
			onClick={ () => props.store.transport.setPlaying(true) }
		/>
	);
}

@inject("store", "engine")
@observer class FreesoundSequencer extends React.Component {

	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
		this._startUpAudio = this._startUpAudio.bind(this);
	}

	_onClick() {
		this.props.store.authentication.authorize();
	}

	_renderMainView() {
		const si = this.props.store.interface.activeSequence;
		const authenticated = this.props.store.authentication.authenticated;
		return (
			<div className="freeseqContainer">
				{!authenticated &&
					<AuthOverlay {...this.props} />
				}
				{authenticated && !this.props.engine.initialized &&
					<AudioContextOverlay {...this.props} />
				}
				<div className="playerContainer" onClick={ () => this.props.store.interface.setSampleSearchFocused(false) }>
					<SequenceListContainer store={this.props.store} />
					<SequencePicker />
				</div>
				<div className="sampleContainer">
					<SamplePicker />
				</div>
			</div>
		);
	}

	_startUpAudio() {
		Tone.Transport.start();
	}

	render() {
		return this._renderMainView(this.props);
	}
}

export default FreesoundSequencer;
