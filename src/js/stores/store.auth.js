import { action, observable, computed } from 'mobx';
import axios from 'axios';
import querystring from 'querystring';
import url from 'url';

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

export default class AuthStore {
	@observable accessToken = null;
	@observable refreshToken = null;
	@computed get authenticated() {
		return this.accessToken !== null;
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
				this.accessToken = res.data.acces_token;
				this.refreshToken = res.data.refresh_token;
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	authorize() {
		const oauth2 = require('simple-oauth2').create(credentials);

		const authorizationUri = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${credentials.client.id}&response_type=code`;

		window.location = authorizationUri;
	}

	@action parseLocationForAuth() {
		const query = querystring.parse(url.parse(window.location.toString()).query);
		if (query.code !== undefined && this.accessToken === null) {
			this._fetchAccessToken(query.code);
		}
	}
}