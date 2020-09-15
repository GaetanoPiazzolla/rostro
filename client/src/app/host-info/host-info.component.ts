import { Component, OnInit, Input} from '@angular/core';
import {SystemInfo} from '../../model/SystemInfo';

@Component({
  selector: 'app-host-info',
  templateUrl: './host-info.component.html',
  styleUrls: ['./host-info.component.less']
})
export class HostInfoComponent implements OnInit {

  @Input()
  public data: SystemInfo;

  constructor() { }

  ngOnInit() {
  }

}
