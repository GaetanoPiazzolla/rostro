export const environment = {

  production: false,

  socketIoUrl: 'http://localhost:3001',
  systemInfoUrl: 'http://localhost:3000/api/system-info',
  wateringUrl: 'http://localhost:3000/api/watering',
  processesUrl: 'http://localhost:3000/api/processes',
  loginUrl: 'http://localhost:3000/api/login',
  processKillUrl: 'http://localhost:3000/api/process/kill',
  processesFindUrl: 'http://localhost:3000/api/process/find',

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
