const disk = require('../services/disk-service');

disk.getInfo('GB').then( info => console.log(info));
