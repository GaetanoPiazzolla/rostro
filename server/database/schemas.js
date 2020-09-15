'use strict';
const mongoose = require('mongoose');
const collectionSize = require('../config/config').getConf('hostInfoCollectionSize');

let hostInfoSchema = new mongoose.Schema(
  {
    cpu_percent: Number
  },
  {
    capped: collectionSize
  });

let HostInfo = mongoose.model('HostInfo', hostInfoSchema);

let getHostInfo = function () {
  return new Promise(resolve => {
    HostInfo.collection.stats(
      function (err, data) {
        resolve(data.avgObjSize);
      }
    );
  })
};

// Export as public API
module.exports = {
  HostInfo: HostInfo,
  getHostInfo: getHostInfo
};
