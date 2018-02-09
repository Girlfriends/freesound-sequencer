import { action, observable, computed } from 'mobx';
import { types } from 'mobx-state-tree';
import url from 'url';
import querystring from 'querystring';
import { fetchAccessToken, getAuthorizationURL } from '../server/server.js';


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
		fetchAccessToken(code).then((res) => {
			if (res.status === 200) {
				self.setAuthTokens(res.data.accessToken, res.data.refresh_token);
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	return {
		authorize() {
			getAuthorizationURL().then((res) => {
				if (res.status === 200) {
					const authorizationUri = res.data.authorizationURL;
					window.location = authorizationUri;
				}
			}).catch((err) => {
				console.error(err)
			});
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