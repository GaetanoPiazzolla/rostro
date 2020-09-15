const mongoose = require('mongoose');
const dataBaseHost = require('../config/config').getConf('dataBaseHost');

// host overwritten by conf
let connect = function (host = dataBaseHost) {

  console.log('MongoDB trying to connect to', host);

  return new Promise((resolve, reject) => {

    mongoose.connect(host, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    let db = mongoose.connection;

    db.on('error', (error) => reject('MongoDB Error in establishing connection to: ' + host + ' for error: ' + error));

    db.once('open', function () {
      console.log('MongoDB connected at', host);
      resolve(true);
    });

  });
};

module.exports = {
  connect: connect
};
