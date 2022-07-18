'use strict';
const systemInformation = require('../node_modules/systeminformation');
const exec = require('child_process').exec;

function getProcessPort() {
  return new Promise((resolve, reject) => {
    exec('netstat -an', function (error, stdout, stderr) {
      if (error) {
        console.error(stderr);
        reject(stderr);
      } else {
        stdout.trim();
        resolve(stdout);
      }
    });
  })
}

const getProcessesAsync = async function (number = 5, orderBy = 'cpu', searchText = null) {

  let processes = await systemInformation.processes();

  if (searchText) {
    // search the provided text in name or command
    processes.list = processes.list.filter(proc => (
      proc.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      proc.command.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    ));
  } else {
    // remove default win processes
    processes.list = processes.list.filter(proc => (
      proc.name !== 'Memory Compression' && proc.name !== 'System Idle Process'
    ));
  }
  let orderedProcesses = processes.list.sort(
    function (a, b) {
      if (orderBy === 'cpu') {
        return b.cpu - a.cpu;
      } else if (orderBy === 'mem') {
        return b.mem - a.mem;
      }
    });

  let subsetOrderedProcesses = orderedProcesses.splice(0, number);

  let processPorts = await getProcessPort();
  let lines = processPorts.trim().split("\n");

  subsetOrderedProcesses.forEach(process => {
    process.ports = lines.filter(line => (
      line.search(' ' + process.pid + '\r$') !== -1
    ));
  });

  return {
    all: processes.all,
    filtered: subsetOrderedProcesses.length,
    running: processes.running,
    blocked: processes.blocked + processes.sleeping,
    processes: subsetOrderedProcesses
  };

};

const getProcessDetailAsync = async function (processName) {
  if (!processName) {
    throw 'No Process name specified';
  } else {
    return await systemInformation.processLoad(processName);
  }
};

const killProcess = function (processPid) {

  return new Promise((resolve, reject) => {

    if (!processPid) {
      let msg = 'pid not provided';
      console.log(msg);
      reject(msg);
    }

    let command;
    if (process.platform === 'linux') {
      command = 'sudo kill -9 ' + processPid;
    } else if (process.platform === 'win32') {
      command = 'taskkill /F /PID ' + processPid;
    } else {
      let msg = 'platform not supported';
      console.log(msg);
      reject(msg);
    }

    console.log('killing process with pid', processPid);
    exec(command, function (error, stdout, stderr) {
      if (error) {
        console.error(stderr);
        reject(stderr);
      } else {
        stdout.trim();
        resolve(stdout);
      }
    });
  })

};

// Export as public API
module.exports = {
  getProcessDetailAsync: getProcessDetailAsync,
  getProcessesAsync: getProcessesAsync,
  killProcess: killProcess,
};
