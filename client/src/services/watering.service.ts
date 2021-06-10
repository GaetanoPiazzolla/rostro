import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SystemInfo} from '../model/SystemInfo';
import {environment} from '../environments/environment';

@Injectable()
export class WateringSerivce {

  constructor(private http: HttpClient) {

  }

  startWatering() {
    return this.http
      .get<{}>(environment.wateringUrl)
      .pipe(map(data => data));
  }

}
