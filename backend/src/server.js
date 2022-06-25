const express = require('express');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./logger');
const path = require('path');
const jwtConfig = config.get('jwt')
const jwtAuth = jwtConfig.disabled ?
  (req, res, next) => {
    req.user = { email: '@root', password: '', role: 'root' };
    return next();
  } :
  require('./auth/jwt')(jwtConfig.secret);

const app = express();

app.use(morgan('combined', {
  stream: logger.stream
}));
app.use(cors());
app.use(express.static('www/public'));
app.use('/images', require('./router/data/images')('www/images'));

app.use(express.json());


app.use('/artist', jwtAuth, require('./router/data/artist'))
app.use('/bill', jwtAuth, require('./router/data/bill'))
app.use('/customer', jwtAuth, require('./router/data/customer'))
app.use('/order', jwtAuth, require('./router/data/order'))
app.use('/painting', jwtAuth, require('./router/data/painting'))
app.use('/photo', jwtAuth, require('./router/data/photo'))
app.use('/user', jwtAuth, require('./router/data/user'))


module.exports = app;