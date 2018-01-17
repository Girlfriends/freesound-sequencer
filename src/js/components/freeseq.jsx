import React from "react";
import SamplePicker from './samplePicker.jsx';
import SequenceContainer from './sequenceContainer.jsx';
import SequencePicker from './sequencePicker.jsx';
import Tone from 'tone';
import { inject, observer } from 'mobx-react';

const AuthButton = (props) => (
	props.authenticated ? (
		<p>
			Welcome!
		</p>
	) : (
		<p>You are not logged in.</p>
	)
);

const Home = (props) => {
	return (
		<div>
			<AuthButton authenticated={props.authenticated}/>
		</div>
	);
};

@inject("store")
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
		return (
			<div className="freeseqContainer">
				<div className="playerContainer" onClick={ () => this.props.store.interface.sampleSearchFocused = false }>
					<SequenceContainer sequence={this.props.store.sequences[0]} columns={4} />
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

	_renderTestView(props) {
		return (
			<div className="freeseqContainer">
				<SequenceContainer sequence={this.props.store.sequences[0]} columns={8} />
				<button onClick={() => this._startUpAudio()} className='startButton' >Start</button>
			</div>
		);
	}

	render() {
		const authenticated = this.props.store.authentication.authenticated;
		if (authenticated) {
			return (
				<div>
					<Home authenticated={authenticated}/>
					<p> Hi there </p>
					{!authenticated &&
						<button onClick={this._onClick}>Authorize</button> }
				</div>
			);
		} else {
			return this._renderTestView(this.props);
		}
	}
}

export default FreesoundSequencer;
