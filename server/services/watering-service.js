const os = require('os');
const exec = require('child_process').exec;

function startWatering(callback) {

  exec("uhubctl -l 1-1 -p 2 -a 1", function (error, stdout, stderr) {
    if (error) {
      console.error(stderr);
    } else {
      console.log('watering started');
      callback && callback();
    }
  });

}

function endWatering(callback) {

  exec("uhubctl -l 1-1 -p 2 -a 0", function (error, stdout, stderr) {
    if (error) {
      console.error(stderr);
    } else {
      console.log('watering started');
      callback && callback();
    }
  });

}

module.exports = {
  startWatering: startWatering,
  endWatering: endWatering
};
