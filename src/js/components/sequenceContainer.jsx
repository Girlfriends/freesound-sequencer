import React from "react";
import Sequence from './sequence.jsx';

export default class SequenceContainer extends React.Component {
	_onAnimationEnd = () => {
		if (this.props.animationEnd) this.props.animationEnd();
	};

	componentDidMount() {
		const elm = this.refs.container;
		elm.addEventListener('animationend', this._onAnimationEnd);
	}

	componentWillUnmount() {
		const elm = this.refs.container;
		elm.removeEventListener('animationend', this._onAnimationEnd);
	}
	
	render() {
		const classNames = "sequenceContainer " + this.props.extraClasses;
		return (
			<div className={classNames} ref='container'>
				<Sequence sequence={this.props.sequence} columns={this.props.columns} />
			</div>
		);
	}
}