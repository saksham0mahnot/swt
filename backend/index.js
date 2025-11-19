// backend/index.js
const serverless = require('serverless-http');
const app = require('./src/app'); // ensure src/app exports an Express app

module.exports = serverless(app);
