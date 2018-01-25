import React from "react";
import SamplePicker from './samplePicker.jsx';
import SequenceListContainer from './sequenceListContainer.jsx';
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
		const si = this.props.store.interface.activeSequence;
		return (
			<div className="freeseqContainer">
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
			return this._renderMainView(this.props);
		}
	}
}

export default FreesoundSequencer;
