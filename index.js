require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const request = require('request');
const bluebird = require('bluebird');
const config = require('./config');
const routes = require('./routes');
const middleware = require('./routes/middleware');
const logger = require('./lib/logger');
const app = express();

/**
 * Setup Database
 */
mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.set('view engine', 'ejs');
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny', {stream: logger.stream}));
app.use(bodyParser.json({verify: middleware.verifyRequestSignature}));
app.use(express.static('public'));

/**
 * Routing
 */
app.use('/', routes);
app.use('/users', require('./model/user/user-router'));

/**
 * Start Server
 */
app.listen(config.server.port, () => {
  logger.info(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
