// EXTERNAL API -----------------------
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const publicIp = require('public-ip');
const geoIp = require('geoip-lite');

// SERVICES ---------------------------
const pingService = require('./services/ping-service');
const socketIoService = require('./services/socket-io-service');
// const dbInfoService = require('./services/database-info-service');
const hostBasicService = require('./services/host-basic-service');
const cpuService = require('./services/cpu-service');
const ramService = require('./services/ram-service');
const processService = require('./services/process-service');
const jwtService = require('./services/jwt-service');
const wateringService = require('./services/watering-service');

// CONFIGURE HTTP server ---------------
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API DEFINITION -----------------------
const port = process.env.PORT || 3000;
const router = express.Router({});

app.use('/api', router);

router.post('/login', jwtService.login);

router.get('/system-info', jwtService.checkToken, function (req, res) {

  res.json({
    percentMemArray: percentMemArray,
    percentCpuArray: percentCpuArray,
    lastNetworkStat: lastNetworkStat,
    geoHostInfo: geoHostInfo,

    totalDisk: hostInfo.totalDisk, // GB
    totalMem: hostInfo.totalMem, // GB
    cpuInfo: hostInfo.cpuInfo,

    uptime: hostInfo.uptime, // HOURS
    hostName: hostInfo.hostName,
    homeDir: hostInfo.homeDir,
    osInfo: hostInfo.osInfo,

    wateringInfo: wateringInfo
  });

});

router.post('/processes', jwtService.checkToken, function (req, res) {
  let number = req.body.number;
  let orderBy = req.body.orderBy;
  let text = req.body.text;
  console.log('Requested n %s /processes/, orderBy %s', number, orderBy);
  processService.getProcessesAsync(number, orderBy, text).then(data =>
    res.json(data));
});

router.get('/process/:name', jwtService.checkToken, function (req, res) {
  let name = req.params.name;
  console.log('Requested /process/ with name:', name);

  processService.getProcessDetailAsync(name).then(data => {
    res.json(data);
  })
});

router.post('/process/kill/', jwtService.checkToken, function (req, res) {
  let pid = req.body.pid;
  console.log('Killing /process/ with pid:', pid);

  processService.killProcess(pid).then(data => {
    console.log(data);
    res.json({msg: data});
  }).catch(data => {
    console.log(data);
    res.status(500).json({msg: data});
  })
});

// WATERING
let wateringInfo = {
  lastExecutedAt: new Date().getTime(),
  lastDurationSeconds: 3
}
wateringService.stopWatering();
router.get('/watering', function (req, res) {
  wateringService.startWatering().then((data) => {
    wateringInfo = data;
    res.status(200).json({wateringInfo})
  }, (err) => {
    res.status(500).json({err: err})
  })
});

//  START THE SERVER  ----------------
console.log('Server started and listening on port', port);
app.listen(port);
socketIoService.listen(app, 3001);

// MONGODB --------------------------
// dbInfoService.start(30000);

// MEMORY ARRAY ----------------------
let percentMemArray = [];

function populatePercentMemArray() {
  if (percentMemArray.length > 100) {
    percentMemArray.shift();
  }
  ramService.getInfo().then(resp => {
    percentMemArray.push(resp.percent)
  })
}

populatePercentMemArray();
setInterval(populatePercentMemArray, 3000); // each three seconds

// CPU ARRAY ------------------------
let percentCpuArray = [];

function populatePercentCpuArray() {
  if (percentCpuArray.length > 100) {
    percentCpuArray.shift();
  }
  cpuService.getCPULoadAVG(1000, 100).then(resp => {
    percentCpuArray.push(resp);
  })
}

populatePercentCpuArray();
setInterval(populatePercentCpuArray, 3000); // each three seconds

// PING --------------------------
let lastNetworkStat = {};

function populateLastNetworkStat() {
  pingService.execute('www.google.com', function (err, result) {
    lastNetworkStat = result;
  })
}

populateLastNetworkStat();
setInterval(populateLastNetworkStat, 1800000); // each 30 minutes

// GEO --------------------------
let geoHostInfo;
(async () => {
  const currentIp = await publicIp.v4();
  console.log('CurrentIp is', currentIp);
  geoHostInfo = geoIp.lookup(currentIp);
  geoHostInfo.currentIp = currentIp;
  console.log('GeoHostInfo Retrieved');
})();

// GENERIC HOST INFO ------------
let hostInfo;
(async () => {
  hostInfo = await hostBasicService.getInfo();
})();
