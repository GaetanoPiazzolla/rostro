'use strict';

const socketIo = require('socket.io');
const http = require('http');

const diskService = require('./disk-service');
const cpuService = require('./cpu-service');
const ramService = require('./ram-service');

function listen(expressApp, port) {

  if (expressApp && port) {

    let server = http.Server(expressApp);
    let io = socketIo(server);
    server.listen(port);

    console.log('Soket-io - started and listening on on port', port);

    io.on('connection', function (socket) {

        console.log('Soket-io - Got connection on socket port', port);

        let recursiveCall = function () {
          if (socket.connected) {

            let promiseArray = [];

            // 0
            promiseArray.push(diskService.getInfo('GB'));
            // 1
            promiseArray.push(ramService.getInfo('GB'));
            // 2 - questo tempo comanda il messaggio: ogni 2 secondi
            promiseArray.push(cpuService.getCPULoadAVG(2000, 100));
            // 3
            promiseArray.push(cpuService.getCPUTemp());

            Promise.all(promiseArray).then(results => {

              const socketObject = {
                disk: {
                  percent: results[0].total.percent,
                  free: results[0].total.free,
                  used: results[0].total.used
                },
                mem: {
                  percent: results[1].percent,
                  free: results[1].free,
                  used: results[1].used
                },
                cpu: {
                  percent: results[2],
                  temperature: results[3].main,
                  //currentSpeed: results[2]
                },
              };

              socket.volatile.emit('message', socketObject);

              recursiveCall();
            });


          }
        };

        recursiveCall();

        socket.on('disconnect', function () {
          console.log('disconnected');
        });

      }
    )
    ;

  }

}


// Export as public API
module.exports = {
  listen: listen,
};
