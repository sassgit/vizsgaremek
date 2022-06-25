const Bill = require('../../model/bill');
module.exports = require('../base')(Bill, require('../../auth/defaultacces'));