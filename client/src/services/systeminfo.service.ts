import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SystemInfo} from '../model/SystemInfo';
import {environment} from '../environments/environment';

@Injectable()
export class SystemInfoService {

  constructor(private http: HttpClient) {

  }

  getSystemInformation() {
    return this.http
      .get<SystemInfo>(environment.systemInfoUrl)
      .pipe(map(data => data));
  }

}
