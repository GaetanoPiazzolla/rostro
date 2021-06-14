var shell = require('shelljs');
var fs = require('fs');
const config = require('../config/config');

const wateringDurationSeconds = config.getConf('wateringDurationSeconds');

function startWatering() {

  return new Promise((resolve, reject) => {
    shell.exec("cd && ./rostro/start-watering.sh", function (error, stdout, stderr) {

      if (error) {
        console.error('error watering', stderr);
        reject(stderr);
      } else {
        console.log('watering started');

        setTimeout(function () {
          stopWatering(function (succ, err) {
            if (err) {
              console.error('error watering', stderr);
              reject(stderr);
            } else {
              console.log('stopped watering')
              let wateringInfo = {
                lastExecutedAt: new Date().getTime(),
                lastDurationSeconds: wateringDurationSeconds
              }
              this.saveWateringInfo("date: " + new Date().toString() + " - duration: " + wateringDurationSeconds)
              resolve(wateringInfo)
            }
          })
        }, wateringDurationSeconds * 1000)
      }
    });
  })

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

  fs.writeFile('/home/pi/watering-data.log', info + ' \n', {flag: 'a'}, function (err) {
    console.log('watering-data.log - ', info);
  });

}

saveWateringInfo('caccona')

module.exports = {
  startWatering: startWatering,
  stopWatering: stopWatering,
  saveWateringInfo: saveWateringInfo
};
