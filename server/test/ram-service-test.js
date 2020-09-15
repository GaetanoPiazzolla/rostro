const ramService = require('../services/ram-service');

ramService.getInfo().then((res) => console.log(res));
