var shell = require('shelljs');
var fs = require('fs');

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

function saveWateringInfo(info) {

  fs.writeFile('/home/pi/watering-data.log', info + ' /n', {flag: 'ax'}, function (err) {
    if (err) throw err;
    console.log("It's saved!");
  });
}

module.exports = {
  startWatering: startWatering,
  stopWatering: stopWatering,
  saveWateringInfo: saveWateringInfo
};
