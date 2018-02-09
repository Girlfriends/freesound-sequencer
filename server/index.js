const express = require('express');
const app = express();
const credentials = require('./credentials.js');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/auth/fetchAccessToken', (req, res) => {
    const tokenUrl = 'https://www.freesound.org/apiv2/oauth2/access_token/';
    const code = req.body.code;
    const data = {
        client_id: credentials.client.id,
        client_secret: credentials.client.secret,
        grant_type: 'authorization_code',
        code: code
    };
    return axios.post(tokenUrl, querystring.stringify(data)).then((fres) => {
        if (fres.status === 200) {
            res.json({
                accessToken: fres.data.access_token,
                refreshToken: fres.data.refresh_token
            }).end();
        } else {
            res.json({}).end();
        }
    }).catch((err) => {
        res.status(401).send(err).end();
    });
})

app.get('/auth/getAuthorizationURL', (req, res) => {
    const authorizationUri = `https://www.freesound.org/apiv2/oauth2/authorize/?client_id=${credentials.client.id}&response_type=code`;
    res.json({
        authorizationURL: authorizationUri
    }).end();
});

app.use('/', express.static('dev_build'));

module.exports = function listen(port) {
    app.listen(port, () => console.log("Freesound sequencer API listening on port " + port));
}