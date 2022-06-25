const express = require('express');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const logger= require('./logger');
const path = require('path');
const jwtConfig = config.get('jwt')
const jwtAuth = jwtConfig.disabled ? (req, res, next) => next() : require('./auth/jwt')(jwtConfig.secret);

const app = express();

app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(express.static('www/public'));
app.use('/images', require('./router/images')('www/images'));

app.use(express.json());


app.use('/artist', jwtAuth, require('./router/artist'))
app.use('/bill', jwtAuth, require('./router/bill'))
app.use('/customer', jwtAuth, require('./router/customer'))
app.use('/order', jwtAuth, require('./router/order'))
app.use('/painting', jwtAuth, require('./router/painting'))
app.use('/photo', jwtAuth, require('./router/photo'))
app.use('/user', jwtAuth, require('./router/user'))


module.exports = app;
