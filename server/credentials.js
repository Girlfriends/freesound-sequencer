const credentials = {
	client: {
		id: process.env.FREESOUND_CLIENT_ID,
		secret: process.env.FREESOUND_CLIENT_SECRET
	},
	auth: {
		authorizeHost: 'https://freesound.org',
		authorizePath: '/apiv2/oauth2/authorize/',
		tokenHost: 'https://freesound.org',
		tokenPath: '/apiv2/oauth2/access_token/'
	}
};

module.exports = credentials;
