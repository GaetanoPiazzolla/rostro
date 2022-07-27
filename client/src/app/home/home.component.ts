import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SystemInfo} from '../../model/SystemInfo';
import {SystemInfoService} from '../../services/systeminfo.service';
import {SysDynamic} from '../../model/SysDynamic';
import {SocketService} from '../../services/socket.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // used inside view
  public systemInfo: SystemInfo = null;
  public systemInfoDynamic: SysDynamic = null;

  // chart data
  public chartMemData: any = {};
  public chartCpuData: any = {};
  public chartHddData: any = {};

  // to configure style
  public chartOptions = environment.chartOptions;
  public chartHddOptions = environment.chartHddOptions;

  // max dimension of ram and cpu graph
  private chartMaxDimension: number;

  constructor(private systemInfoService: SystemInfoService,
              private socketService: SocketService) {
    // nothing
  }

  ngOnInit(): void {

    this.initChartData();

    this.initIoConnection();

    this.systemInfoService.getSystemInformation().subscribe(
      res => {
        this.handleStartLoad(res);
      }, error => {
        console.log(error);
      }
    );

  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage()
      .subscribe((message: SysDynamic) => {
        this.systemInfoDynamic = message;

        this.chartMemData.datasets[0].data.push(message.mem.percent);
        if (this.chartMemData.datasets[0].data.length > this.chartMaxDimension) {
          const removed = this.chartMemData.datasets[0].data.shift();
          console.log('removed ' + removed + ' from chartMemData');
        }

        this.chartCpuData.datasets[0].data.push(message.cpu.percent);
        if (this.chartCpuData.datasets[0].data.length > this.chartMaxDimension) {
          const removed = this.chartCpuData.datasets[0].data.shift();
          console.log('removed ' + removed + ' from percentCpuArray');
        }

        this.chartMemData.datasets = this.chartMemData.datasets.slice();
        this.chartCpuData.datasets = this.chartCpuData.datasets.slice();

        this.chartHddData.datasets[0].data = [
          message.disk.used, message.disk.free
        ];
      });
  }

  private handleStartLoad(res) {
    this.systemInfo = res;

    this.chartMemData.datasets[0].data = res.percentMemArray;
    this.chartCpuData.datasets[0].data = res.percentCpuArray;

  }

  private initChartData() {
    this.chartMaxDimension = 100;

    this.chartMemData.labels = [];
    this.chartCpuData.labels = [];
    this.chartMemData.labels = [];
    this.chartCpuData.labels = [];

    for (let i = 1; i <= this.chartMaxDimension; i++) {
      this.chartMemData.labels.push(i);
      this.chartCpuData.labels.push(i);
    }
    this.chartMemData.datasets = [{
      data: [],
      label: '% Memory Usage',
      pointBorderWidth: 0.1
    }];
    this.chartCpuData.datasets = [{
      data: [],
      label: '% Cpu Usage',
      pointBorderWidth: 0.1
    }];

    this.chartHddData.labels = ['Used Space', 'Free Space'];
    this.chartHddData.datasets = [{
      data: null
    }];

  }

  ngAfterViewInit(): void {

  }


}
