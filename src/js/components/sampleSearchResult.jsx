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
            <div className="sample-search-result" >
                <img className="sample-result-image" src={this.props.imageURL} />
                <div className="sample-result-panel">
                    <span className="sample-result-title" >{this.props.name}</span>
                    <div className="sample-result-buttons" >
                        <div
                            className="sample-preview-button sample-result-button"
                            onClick={this._playAudio.bind(this)}
                        > 
                            <div className="text-wrapper" > Preview </div>
                        </div>
                        <div
                            className="sample-swap-button sample-result-button"
                            onClick={sampleUpdater}
                        >
                            <div className="text-wrapper" > Use </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}