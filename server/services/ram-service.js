const os = require('os');
const exec = require('child_process').exec;

function calculateFreeMem() {

  return new Promise((resolve) => {

    let freeMem = os.freemem();

    if (process.platform === 'linux') {
      exec("cat /proc/meminfo | awk 'BEGIN {} /MemAvailable/ { print $2 }'", function (error, stdout) {
        if (error) {
          console.log(error);
        } else {
          freeMem = freeMem + stdout * 1024;
          resolve(freeMem);
        }
      })
    } else {
      resolve(freeMem);
    }

  });

}

function getInfo(unit = 'GB', decimal = 2) {

  return new Promise((resolve, reject) => {

    let divisor = 1;

    switch (unit) {
      case 'GB':
        divisor = divisor * 1024;
      case 'MB':
        divisor = divisor * 1024;
      case 'KB':
        divisor = divisor * 1024;
      case 'B':
        break;
      default:
        reject('Invalid measure unit %s', unit);
        break;
    }

    const totalMem = os.totalmem();

    calculateFreeMem().then(function (freeMem) {

      const usedMem = totalMem - freeMem;

      let info = {
        total: (totalMem / divisor).toFixed(decimal),
        used: (usedMem / divisor).toFixed(decimal),
        free: (freeMem / divisor).toFixed(decimal),
        percent: (usedMem / totalMem * 100).toFixed(decimal)
      };

      resolve(info);

    })

  });

}

module.exports = {
  getInfo: getInfo
};
