import React, { Component } from 'react';

export default class SampleSearchResult extends Component {
    _audio = new Audio(this.props.previewURL);

    _playAudio = () => {
        this._audio.currentTime = 0;
        this._audio.play();
    }

    render() {
        const sampleUpdater = () => { this.props.setActiveSample(this.props.downloadURL) };
        return (
            <div className="sampleSearchResult" >
                <img src={this.props.imageURL} />
                <button
                    className="samplePreview"
                    onClick={this._playAudio.bind(this)}
                > Preview </button>
                <button
                    className="sampleSwap"
                    onClick={sampleUpdater}
                > Use </button>
                <span>{this.props.name}</span>
            </div>
        )
    }
}