
var shell = require('shelljs');

function startWatering(callback) {

  shell.exec("cd && ./rostro/start-watering.sh", function (error, stdout, stderr) {
    if (error) {
      console.error(stderr);
    } else {
      console.log('watering started');
      callback && callback();
    }
  });

}

function stopWatering(callback) {

  shell.exec("cd && ./rostro/stop-watering.sh", function (error, stdout, stderr) {
    if (error) {
      console.error(stderr);
    } else {
      console.log('watering stopped');
      callback && callback();
    }
  });

}

module.exports = {
  startWatering: startWatering,
  stopWatering: stopWatering
};
