'use strict';
const moment = require('moment');
const schemas = require('../database/schemas');
const config = require('../config/config');
const cpuService = require('./cpu-service');
const dbConnection = require('../database/connection');

let running;

const collectionLimit = config.getConf('hostInfoCollectionSize');

let start = function (interval = 30000) {

  dbConnection.connect().then(
    () => {

      console.log('Db-Info - Starting database-info-service');
      console.log('Db-Info - Interval: %d minutes', new moment.duration(interval).asMinutes());
      console.log('Db-Info - CollectionSize: ', collectionLimit);

      schemas.getHostInfo().then(avgObjectSize => {
        if (avgObjectSize) {
          const nDocument = ~~(collectionLimit / avgObjectSize);
          console.log('Db-info - Average object size: ', avgObjectSize);
          console.log('Db-info - %d document will be mantained',nDocument);
          let diff = new moment.duration( nDocument * interval);
          console.log('Db-Info - Information will be mantained for: ' + diff.asHours().toFixed(2) + ' hours');
        }
      });

      running = setInterval(function () {
        console.log('Db-Info - Running database-info-service interval');

        cpuService.getCPULoadAVG().then(result => {

          console.log('DB-Info - retrieved cpu loadAvg', result);
          let hostInfo = new schemas.HostInfo({cpu_percent: result});

          hostInfo.save(function (err, saved) {
            if (err) {
              console.log(err);
            }
            console.log('Db-Info - Saved host info at %s', new moment(saved._id.getTimestamp()).format('DD/MM/YYYY hh:mm:ss'));
          });


        });
      }, interval);

    },

    (error) => {
      console.log(error);
    });
};

let stop = function () {
  console.log('Stopping database-info-service');
  clearInterval(running);
};

module.exports = {
  start: start,
  stop: stop
};
