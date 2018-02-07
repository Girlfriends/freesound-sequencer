import { action, observable, computed } from 'mobx';
import { types } from 'mobx-state-tree';
import axios from 'axios';
import querystring from 'querystring';
import url from 'url';
import credentials from ('../credentials/credentials.js');

const AuthModel = types.model({
	id: types.identifier(),
	accessToken: types.optional(types.maybe(types.string), null),
	refreshToken: types.optional(types.maybe(types.string), null)
}).views(self => {
	return {
		get authenticated() { return self.accessToken !== null },
		get clientSecret() { return credentials.client.secret }
	}
}).actions(self => {
	function _fetchAccessToken(code) {
		const tokenUrl = 'https://www.freesound.org/apiv2/oauth2/access_token/';
		const data = {
			client_id: credentials.client.id,
			client_secret: credentials.client.secret,
			grant_type: 'authorization_code',
			code: code
		};
		axios.post(tokenUrl, querystring.stringify(data)).then((res) => {
			if (res.status === 200) {
				self.setAuthTokens(res.data.access_token, res.data.refresh_token);
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	return {
		authorize() {
			const oauth2 = require('simple-oauth2').create(credentials);
	
			const authorizationUri = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${credentials.client.id}&response_type=code`;
	
			window.location = authorizationUri;
		},

		parseLocationForAuth() {
			const query = querystring.parse(url.parse(window.location.toString()).query);
			if (query.code !== undefined && self.accessToken === null) {
				_fetchAccessToken(query.code);
			}
		},

		setAuthTokens(accessToken, refreshToken) {
			self.accessToken = accessToken;
			self.refreshToken = refreshToken;
		}
	}
});

export default AuthModel;