import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable()
export class WateringSerivce {

  constructor(private http: HttpClient) {

  }

  startWatering() {
    return this.http
      .get<{}>(environment.giveWaterUrl)
      .pipe(map(data => data));
  }

  getWateringInfo() {
    return this.http
      .get<{}>(environment.getWaterInfoUrl)
      .pipe(map(data => data));
  }

  getLightStatus() {
    return this.http
    .get<{}>(environment.getLightStatusUrl)
    .pipe(map(data => data));
  }

  getAirStatus() {
    return this.http
    .get<{}>(environment.getAirStatusUrl)
    .pipe(map(data => data));
  }

  startAir() {
    return this.http
    .get<{}>(environment.getStartAirUrl)
    .pipe(map(data => data));
  }
  stopAir(){
    return this.http
    .get<{}>(environment.getStopAirUrl)
    .pipe(map(data => data));
  }
  startLight(){
    return this.http
    .get<{}>(environment.getStartLightUrl)
    .pipe(map(data => data));
  }
  stopLight(){
    return this.http
    .get<{}>(environment.getStopLightUrl)
    .pipe(map(data => data));
  }

}
