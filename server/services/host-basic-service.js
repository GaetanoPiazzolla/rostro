const diskService = require('./disk-service');
const cpuService = require('./cpu-service');
const systemInformation = require('../node_modules/systeminformation');
const os = require('os');

getInfo = function () {

  return new Promise(resolve => {

    let promiseArray = [];

    // results[0]
    promiseArray.push(cpuService.getCPUInfo());
    // results[1]
    promiseArray.push(diskService.getInfo('GB'));
    // result[2]
    promiseArray.push(systemInformation.osInfo());

    Promise.all(promiseArray).then(results => {

      resolve({
        hostName: os.hostname(),
        homeDir: os.homedir(),
        uptime: (os.uptime() / 3600).toFixed(0), // hours
        totalMem: (os.totalmem() / (1073741824)).toFixed(2), // GB
        cpuInfo: results[0],
        totalDisk: results[1].total.total,
        osInfo: results[2]
      });
    });
  })
};

module.exports = {
  getInfo: getInfo
};
