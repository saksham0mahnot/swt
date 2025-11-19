// swt-services/index.js
const serverless = require('serverless-http');
const app = require('./src/app'); // ensure this exports the express `app` (see below)

module.exports = serverless(app);
