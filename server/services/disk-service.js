const fileSystem = require('systeminformation/lib/filesystem');

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

    fileSystem.fsSize(function (result) {

      let info = {
        disks : result,
        total : totalFs(result, decimal, divisor)
      };

      resolve(info);

    });

  });

}

function totalFs(fsArray,decimal,divisor) {
  let totalSize = 0;
  let totalUsed = 0;
  fsArray.forEach(fs => {
    totalSize += fs.size;
    totalUsed += fs.used;
  });
  let totalFree = totalSize - totalUsed;
  let totalPercent = totalSize ? 100.0 * totalUsed / totalSize : 0;

  return {
    total: (totalSize / divisor).toFixed(decimal),
    used: (totalUsed / divisor).toFixed(decimal),
    free: (totalFree / divisor).toFixed(decimal),
    percent: totalPercent.toFixed(decimal)
  };
}

module.exports = {
  getInfo: getInfo
};
