'use strict';
const osType = require('os').type();
const exec = require('child_process').exec;

function execute(host, callback) {

  var result = {};
  result.avg = 0;
  result.max = 0;
  result.min = 0;
  result.executedAt = 0;
  result.status = null;

  if (!host) {
    result.status = 'NOTFOUND';
    const error = new Error('Necessary parameter absent');

    return callback
      ? callback(error, result)
      : console.error(error);
  }

  //Windows
  if (osType === 'Windows_NT') {
    console.log('PingService - executing ping - WINDOWS Service');

    exec("ping " + host , function (error, stdout, stderr) {
      if (error) {
        console.error(stderr);
      } else {
        let lines = stdout.trim().split("\n");
        let values = lines[lines.length -1].split(' = ');
        values = values.slice(1,values.length);
        values = values.map( val => {
          const splitted = val.split(',')[0];
          return splitted.slice(0,splitted.length-2)
        });

        result.avg = values[2];
        result.max = values[1];
        result.min = values[0];
        result.status = 'OK';
        result.executedAt = new Date().getTime();

        console.log('PingService -Ping to %s has been executed',host);
        callback && callback(null, result);
      }
    });
  }

  //Linux
  else {
    console.log('PingService - executing ping - LINUX service');
    exec("ping " + host + " -c 4", function (error, stdout, stderr) {
      if (error) {
        console.error(stderr);
      } else {
        let lines = stdout.trim().split("\n");
        const values = lines[lines.length -1].split(' = ')[1].split('/');

        result.avg = values[1];
        result.max = values[2];
        result.min = values[0];
        result.status = 'OK';
        result.executedAt = new Date().getTime();

        console.log('PingService -Ping to %s has been executed',host);
        callback && callback(null, result);
      }
    });
  }
}

// Export as public API
module.exports = {
  execute: execute,
};
