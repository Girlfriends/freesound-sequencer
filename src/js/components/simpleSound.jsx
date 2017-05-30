import React from "react";
import freesound from '../freesound.js/freesound.js';

const freesoundCredentials = require('../credentials/freesound.json');

export default class SimpleSound extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sounds: [],
			soundSearch: ''
		};
		this._onClick = this._onClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// this._fetchSoundsForQuery(this.props.src);
	}

	_fetchSoundsForQuery(query) {
		const fields = 'id,name,url';
		const page = 1;
		const filter = "duration:[1.0 TO 15.0]";
		const sort = "rating_desc";
		const token = freesoundCredentials['client-secret'];
		freesound.textSearch(query, { page, filter, sort, fields, token }, this._updateSounds.bind(this));
	}

	_onClick(soundUrl) {
		console.log(soundUrl);
	}

	_updateSounds(resultSounds) {
		const sounds = [];
		for (let i = 0; i < Math.min(10, resultSounds.count); i++) {
			const sound = resultSounds.getSound(i);
			sounds.push(
				{
					id: sound.id,
					name: sound.name,
					url: sound.url
				}
			);
		}
		this.setState({ sounds });
	}

	handleChange(event) {
		this.setState({soundSearch: event.target.value});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.soundSearch);
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Search for a sound:
						<input type="text" value={this.state.soundSearch} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}

	// <p>{ "Searching for: " + this.props.src }</p>
	// 			<ul>
	// 				{
	// 					this.state.sounds.map((sound) => {
	// 						return <li key={sound.id}>
	// 							{ sound.name + " : " + sound.id }
	// 							<button onClick={() => this._onClick(sound.url)}>Download</button>
	// 						</li>; }
	// 					)
	// 				}
	// 			</ul>
}