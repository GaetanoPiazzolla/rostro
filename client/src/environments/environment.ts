export const environment = {

  production: false,

  socketIoUrl: 'http://localhost:3001',
  systemInfoUrl: 'http://localhost:3000/api/system-info',
  processesUrl: 'http://localhost:3000/api/processes',
  loginUrl: 'http://localhost:3000/api/login',
  processKillUrl: 'http://localhost:3000/api/process/kill',
  processesFindUrl: 'http://localhost:3000/api/process/find',

  giveWaterUrl: 'http://localhost:3000/api/water/give',
  getWaterInfoUrl: 'http://localhost:3000/api/water/info',
  getAirStatusUrl: 'http://localhost:3000/api/air/info',
  getLightStatusUrl: 'http://localhost:3000/api/light/info',

  getStartAirUrl: 'http://localhost:3000/api/air/start',
  getStopAirUrl: 'http://localhost:3000/api/air/stop',
  getStartLightUrl: 'http://localhost:3000/api/light/start',
  getStopLightUrl: 'http://localhost:3000/api/light/stop',

  chartOptions: {
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 14
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white',
          fontSize: 12
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white',
          fontSize: 12
        }
      }]
    }
  },

  chartHddOptions: {
    legend: {
      labels: {
        fontColor: 'white',
        fontSize: 14
      }
    }
  },

  googleApiKey: 'null'

};
