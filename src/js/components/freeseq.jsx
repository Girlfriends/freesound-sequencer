import React from "react";
import SimpleSound from './simpleSound.jsx';
import { observer } from "mobx-react";

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

@observer class FreesoundSequencer extends React.Component {

	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
	}

	_onClick() {
		this.props.store.authentication.authorize();
	}

	render() {
		const authenticated = this.props.store.authentication.authenticated;
		return (
			<div>
				<Home authenticated={authenticated}/>
				<p> Hi there </p>
				{!authenticated &&
					<button onClick={this._onClick}>Authorize</button> }
			</div>
		);
	}
}

export default FreesoundSequencer;
