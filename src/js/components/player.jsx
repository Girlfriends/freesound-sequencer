import React from "react";
import Tone from 'tone';

export default class Player extends React.Component {
	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
	}

	componentDidMount() {
		this._player = new Tone.Player({
			autostart: false,
			url: this.props.sound.preview,
			loop: false
		}).toMaster();
	}

	componentDidUpdate() {
		this._player.load(this.props.sound.preview);
	}

	_onClick() {
		this._player.start();
	}

	render() {
		return (
			<li>
				{ this.props.sound.name + " : " + this.props.sound.id }
				<button onClick={() => this._onClick()}>Play</button>
				<button onClick={() => this.props.onSelect(this.props.sound.preview)}>Select</button>
			</li>
		);
	}
}