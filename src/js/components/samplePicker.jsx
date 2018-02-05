import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';
import Tone from 'tone';
import SampleSearchResult from './sampleSearchResult.jsx';
const freesound = require('../freesound.js/freesound.js');

@inject ('store')
@observer class SamplePicker extends Component {

	constructor(props) {
		super(props);
		this._fetchSoundsForQuery = this._fetchSoundsForQuery.bind(this);
		this._handleChange = this._handleChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_fetchSoundsForQuery(query) {
		const fields = 'id,name,url,previews,images,download';
		const page = 1;
		const filter = "duration:[0.0 TO 1.5]";
		const sort = "rating_desc";
		const token = this.props.store.authentication.clientSecret;
		freesound.textSearch(query, { page, filter, sort, fields, token }, (response) => {
			const activeSampleIdx = this.props.store.interface.activeSequence;
			const activeSample = this.props.store.sequences[activeSampleIdx];
			activeSample.setSearchResults(response.results);
		});
	}

	_handleChange(event) {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
		activeSample.setSearchText(event.target.value);
	}

	_handleSampleUpdate(sampleURL) {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
		activeSample.setActiveSample(sampleURL);
	}

	_handleSubmit(event) {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
		// freesound.setToken(this.props.store.authentication.accessToken);
		this._fetchSoundsForQuery(activeSample.sampleSearch);
		event.preventDefault();
	}

	render() {
		const activeSampleIdx = this.props.store.interface.activeSequence;
		const activeSample = this.props.store.sequences[activeSampleIdx];
		let className = "sample-picker";
		if (this.props.store.interface.sampleSearchFocused) {
			className += " sample-picker-focused";
		}
		const searchResults = activeSample.searchResults.map((result) => {
			return (
				<SampleSearchResult
					name={result.name}
					imageURL={result.imageURL}
					previewURL={result.previewURL}
					downloadURL={result.downloadURL}
					setActiveSample={this._handleSampleUpdate.bind(this)}
					key={result.id}
				/>
			)
		});
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
					<form onSubmit={this._handleSubmit} className="sample-search-form" >
						<label className="sample-search-label" >
							<input
								type="text"
								value={activeSample.sampleSearch}
								onChange={this._handleChange}
								placeholder="Search"
								className="sample-search-field"
							/>
							<input type="submit" value="Search" className="sample-search-button" />
						</label>
					</form>
					<div className="search-results-scrollable" >
						{searchResults}
					</div>
				</div>
			</CSSTransition>
		)
	}
}

export default SamplePicker;