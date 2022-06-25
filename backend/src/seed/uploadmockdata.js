const fsp = require('fs').promises;
const mongoose = require('mongoose');
const config = require('config');
const database = config.get('database');
const data = require('./generated.json');

const { host, user, pass } = config.get('database');

mongoose.connect(host, { user, pass })
  .then(conn => {
    console.log('Db connection is successful, start upload!');
    
  })
  .catch( err => {
    console.log(err);
    process.exit(1);
  });