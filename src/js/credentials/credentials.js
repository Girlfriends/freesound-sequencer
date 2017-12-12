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

export default credentials;