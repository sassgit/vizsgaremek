const Photo = require('../../model/photo');
module.exports = require('../base')(Photo, require('../../auth/defaultacces'));