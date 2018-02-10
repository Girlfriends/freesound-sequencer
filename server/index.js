const express = require('express');
const app = express();
const credentials = require('./credentials.js');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const freesound = require('./freesound.js/freesound.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.post('/search', (req, res) => {
    const fields = 'id,name,url,previews,images,download';
    const page = 1;
    const filter = "duration:[0.0 TO 1.5]";
    const sort = "rating_desc";
    const query = req.body.query;
    const token = credentials.client.secret;
    freesound.textSearch(query, { page, filter, sort, fields, token }, (response) => {
        const data = { results: response.results };
        res.json(data).end();
    });
});

app.use('/', express.static('dev_build'));

module.exports = function listen(port) {
    app.listen(port, () => console.log("Freesound sequencer API listening on port " + port));
}