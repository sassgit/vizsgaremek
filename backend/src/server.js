const express = require('express');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./logger');

const jwtConfig = config.get('jwt')
const jwtAuth = jwtConfig.disabled ?
  (req, res, next) => {
    req.user = { email: '@root', password: '', role: 'root' };
    return next();
  } :
  require('./auth/jwt')(jwtConfig.secret);

const app = express();
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(express.json());

app.use(express.static('www/public'));
app.use('/images', require('./router/data/images')('www/images'));

app.use('/login', require('./router/login'));

const entityPaths = ['artist', 'customer', 'order', 'painting', 'photo', 'user'];
const routers = entityPaths;

entityPaths.forEach((entityName, index) => 
    app.use(`/${entityName}`, jwtAuth, require(`./router/data/${routers[index]}`)));

module.exports = app;
