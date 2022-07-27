var shell = require('shelljs');
var fs = require('fs');
const config = require('../config/config');
const wateringDurationSeconds = config.getConf('wateringDurationSeconds');

getStopReleCommand = function (releNum) {
  if (process.platform === 'linux') {
    return "cd && ./rostro/stop-rele.sh" + releNum
  } else {
    return "cd"
  }
}

getStartReleCommand = function (releNum) {
  if (process.platform === 'linux') {
    return "cd && ./rostro/start-rele.sh" + releNum
  } else {
    return "cd"
  }
}

getInfoReleCommand = function (releNum) {
  if (process.platform === 'linux') {
    return "cd && ./rostro/get-rele.sh" + releNum
  } else {
    return "echo 0x00"
  }
}

function startAir() {
  return new Promise((resolve, reject) => {
    shell.exec(getStartReleCommand(config.getConf('rele_air_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error starting air', stderr);
        reject(stderr);
      } else {
        console.log('started air')
        resolve();
      }
    });
  })
}
function startLight() {
  return new Promise((resolve, reject) => {
    shell.exec(getStartReleCommand(config.getConf('rele_light_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error starting air', stderr);
        reject(stderr);
      } else {
        console.log('started light')
        resolve();
      }
    });
  })
}
function stopAir() {
  return new Promise((resolve, reject) => {
    shell.exec(getStopReleCommand(config.getConf('rele_air_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error starting air', stderr);
        reject(stderr);
      } else {
        console.log('stopped air')
        resolve();
      }
    });
  })
}
function stopLight() {
  return new Promise((resolve, reject) => {
    shell.exec(getStartReleCommand(config.getConf('rele_light_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error starting air', stderr);
        reject(stderr);
      } else {
        console.log('stopped light')
        resolve();
      }
    });
  })
}

function getAir() {
  return new Promise((resolve, reject) => {

    shell.exec(getInfoReleCommand(config.getConf('rele_air_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error getting info', stderr);
        reject(stderr);
      } else {
        if (stdout.trim() === '0x00') {
          resolve({ status: 'OFF' })
        }
        else if (stdout.trim() === '0xff') {
          resolve({ status: 'ON' })
        }
        else {
          console.error('unknown status for air rele')
          resolve({status: 'UNKNOWN' })
        }
      }
    });

  })
}
function getLight() {
  return new Promise((resolve, reject) => {

    shell.exec(getInfoReleCommand(config.getConf('rele_light_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error getting info', stderr);
        reject(stderr);
      } else {
        if (stdout.trim() === '0x00') {
          resolve({ status: 'OFF' })
        }
        else if (stdout.trim() === '0xff') {
          resolve({ status: 'ON' })
        }
        else {
          console.error('unknown status for light rele')
          resolve({status: 'UNKNOWN' })
        }
      }
    });

  })
}

function giveWater() {

  return new Promise((resolve, reject) => {

    shell.exec(getStartReleCommand(config.getConf('rele_water_number')), function (error, stdout, stderr) {
      if (error) {
        console.error('error watering', stderr);
        stopWatering()
        reject(stderr);
      } else {
        console.log('watering started');

        setTimeout(function () {
          stopWater(function (succ, err) {
            if (err) {
              console.error('error watering', stderr);
              reject(stderr);
            } else {
              console.log('stopped watering')
              let wateringInfo = {
                lastExecutedAt: new Date().getTime(),
                lastDurationSeconds: wateringDurationSeconds
              }
              saveWateringInfo("date: " + new Date().toString() + " - duration: " + wateringDurationSeconds)
              resolve(wateringInfo)
            }
          })
        }, wateringDurationSeconds * 1000)
      }
    });

  })
}

function stopWater(callback) {
  shell.exec(getStopReleCommand(config.getConf('rele_water_number')), function (error, stdout, stderr) {
    if (error) {
      console.error(stderr);
    } else {
      console.log('watering stopped');
      callback && callback();
    }
  });
}

function saveWateringInfo(info) {
  fs.writeFile('/home/pi/watering-data.log', info + ' \n', { flag: 'a' }, function (err) {
    console.log('watering-data.log - ', info);
  });
}

module.exports = {
  startAir: startAir,
  startLight: startLight,

  stopAir: stopAir,
  stopLight: stopLight,

  getAir: getAir,
  getLight: getLight,

  giveWater: giveWater
};