'use strict';
const os = require("os");
const util = require("../services/util");
const cpuSystemInformation = require('systeminformation/lib/cpu');

//Create function to get CPU information
function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0, totalTick = 0;
  let cpus = os.cpus();

  //Loop through CPU cores
  for (let i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    let cpu = cpus[i];

    //Total up the time in the cores tick
    Object.keys(cpu.times).forEach(function (key) {
      totalTick += cpu.times[key];
    });

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length, total: totalTick / cpus.length};
}

// load average for the past 1000 milliseconds
// calculated every 100
function getCPULoadAVG(avgTime = 1000, delay = 100) {

  return new Promise((resolve, reject) => {

    const n = ~~(avgTime / delay);
    if (n <= 1) {
      reject('Error: interval to small');
    }

    let i = 0;
    let samples = [];
    const avg1 = cpuAverage();

    let interval = setInterval(() => {

      if (i >= n) {
        clearInterval(interval);
        resolve(((util.arrAvg(samples) * 100)).toFixed(2));
      }

      const avg2 = cpuAverage();
      const totalDiff = avg2.total - avg1.total;
      const idleDiff = avg2.idle - avg1.idle;

      samples[i] = (1 - idleDiff / totalDiff);

      i++;

    }, delay);

  });

}

let getCPUTemp = function () {
  return cpuSystemInformation.cpuTemperature();
};


let getCPUInfo = function () {
  return cpuSystemInformation.cpu().then(cpuInfo => {

    const cpuInfoText = cpuInfo.manufacturer + ' ' + cpuInfo.brand + ' - '
      + cpuInfo.speedmax + 'GHz ' + cpuInfo.cores + ' - cores';

    console.log('CpuService - retrieved CPU info text:', cpuInfoText);

    return cpuInfoText;

  });
};

module.exports = {

  getCPULoadAVG: getCPULoadAVG,
  getCPUTemp: getCPUTemp,
  getCPUInfo: getCPUInfo

};
