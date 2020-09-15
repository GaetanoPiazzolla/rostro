// ------------------ DB ---------------------------

const schemas = require('../database/schemas');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to DB');

  var test = new schemas.HostInfo({ hddUsage: 100 });

  test.save(function (err, saved) {
    if (err) {
      return console.error(err);
    }
    else {

     console.log('saved');

    }
  });
});


// -------------------------------------------------
