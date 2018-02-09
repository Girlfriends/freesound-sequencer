require('dotenv').config();
const listen = require('./server/index.js');

listen(process.env.PORT);