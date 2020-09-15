
const cpuService = require("../services/cpu-service");

cpuService.getCPULoadAVG(300,100).then(avg => console.log(avg));
