import { Component, Input, OnInit } from '@angular/core';
import { WateringInfo } from 'src/model/WateringInfo';
import { ReleInfo } from 'src/model/ReleInfo';
import { WateringSerivce } from "../../services/watering.service";

@Component({
  selector: 'app-grow-box',
  templateUrl: './grow-box.component.html',
  styleUrls: ['./grow-box.component.less']
})
export class GrowBoxComponent implements OnInit {

  public wateringInfo: WateringInfo = null;
  public air: ReleInfo = {};
  public light: ReleInfo = {};

  constructor(private wateringSerivce: WateringSerivce) {
  }

  ngOnInit() {
    this.getLastWatering();
    this.getAirStatus();
    this.getLightStatus();
  }

  startWatering() {
    this.wateringSerivce.startWatering().subscribe((data) => {
      console.log(data);
      this.getLastWatering();
    });
  }

  getLastWatering() {
    this.wateringSerivce.getWateringInfo().subscribe((data: WateringInfo) => {
      this.wateringInfo = data;
    })
  }

  getAirStatus() {
    this.wateringSerivce.getLightStatus().subscribe((data: ReleInfo) => {
      this.air = data;
    })
  }

  getLightStatus() {
    this.wateringSerivce.getLightStatus().subscribe((data: ReleInfo) => {
      this.light = data;
    })
  }

  turnOnAir() {
    this.wateringSerivce.startAir().subscribe((data) => {
      this.getAirStatus()
    })
  }
  turnOffAir() {
    this.wateringSerivce.stopAir().subscribe((data) => {
      this.getAirStatus()
    })
  }
  turnOnLight(){
    this.wateringSerivce.startLight().subscribe((data) => {
      this.getLightStatus()
    })
  }
  turnOffLight(){
    this.wateringSerivce.stopLight().subscribe((data) => {
      this.getLightStatus()
    })
  }

}
