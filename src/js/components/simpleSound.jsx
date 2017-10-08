import React from "react";
import Tone from 'tone';
import freesound from '../freesound.js/freesound.js';
import Player from './player.jsx';
import Sequence from './sequence.jsx';

const freesoundCredentials = require('../credentials/freesound.json');

export default class SimpleSound extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sounds: [],
			soundSearch: '',
			selectedSound: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	componentDidMount() {
	}

	_fetchSoundsForQuery(query) {
		const fields = 'id,name,url,previews';
		const page = 1;
		const filter = "duration:[0.0 TO 1.5]";
		const sort = "rating_desc";
		const token = freesoundCredentials['client-secret'];
		freesound.textSearch(query, { page, filter, sort, fields, token }, this._updateSounds.bind(this));
	}

	_updateSounds(resultSounds) {
		const sounds = [];
		for (let i = 0; i < Math.min(10, resultSounds.count); i++) {
			const sound = resultSounds.getSound(i);
			sounds.push(
				{
					id: sound.id,
					name: sound.name,
					url: sound.url,
					preview: sound.previews['preview-lq-mp3']
				}
			);
		}
		this.setState({ sounds });
	}

	handleChange(event) {
		this.setState({soundSearch: event.target.value});
	}

	handleSubmit(event) {
		this._fetchSoundsForQuery(this.state.soundSearch);
		event.preventDefault();
	}

	onSelect(soundSrc) {
		this.setState({
			selectedSound: soundSrc
		});
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
					<ul>
					{
						this.state.sounds.map((sound) => {
							return <Player key={sound.id} sound={sound} onSelect={this.onSelect}/>
						})
					}
					</ul>
				</form>
				<Sequence src={this.state.selectedSound} />
			</div>
		);
	}
}