import React from "react";
import axios from 'axios';
import querystring from 'querystring';
import url from 'url';
import SimpleSound from './simpleSound.jsx';

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

const cjson = require('../credentials/freesound.json');

const credentials = {
	client: {
		id: cjson['client-id'],
		secret: cjson['client-secret']
	},
	auth: {
		authorizeHost: 'https://freesound.org',
		authorizePath: '/apiv2/oauth2/authorize/',
		tokenHost: 'https://freesound.org',
		tokenPath: '/apiv2/oauth2/access_token/'
	}
};

export default class FreesoundSequencer extends React.Component {

	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
		this.state = {
			accessToken: null,
			refreshToken: null
		};
	}

	componentDidMount() {
		const query = querystring.parse(url.parse(window.location.toString()).query);
		if (query.code !== undefined && this.state.accessToken === null) {
			this._fetchAccessToken(query.code);
		}
	}

	_fetchAccessToken(code) {
		const tokenUrl = 'https://www.freesound.org/apiv2/oauth2/access_token/';
		const data = {
			client_id: credentials.client.id,
			client_secret: credentials.client.secret,
			grant_type: 'authorization_code',
			code: code
		};
		axios.post(tokenUrl, querystring.stringify(data)).then((res) => {
			if (res.status === 200) {
				this.setState({
					accessToken: res.data.acces_token,
					refreshToken: res.data.refresh_token
				});
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	_onClick() {
		const oauth2 = require('simple-oauth2').create(credentials);

		const authorizationUri = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${credentials.client.id}&response_type=code`;

		window.location = authorizationUri;
	}

	render() {
		return (
			<div>
				<Home authenticated={this.state.accessToken !== null}/>
				<p> Hi there </p>
				{this.state.accessToken === null &&
					<button onClick={this._onClick}>Authorize</button> }
				{this.state.accessToken !== null &&
					<SimpleSound /> }
					{this.state.accessToken !== null &&
					<SimpleSound /> }
					{this.state.accessToken !== null &&
					<SimpleSound /> }
			</div>
		);
	}
}


