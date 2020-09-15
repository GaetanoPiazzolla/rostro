import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private readonly postOptions: any;

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.postOptions = {headers: headers};
    this.postOptions['observe'] = 'body';
  }

  findProcesses(orderBy: string, number: number, inputValue: string): Observable<Processes> {
    return this.http
      .post<Processes>(environment.processesUrl + '/',
        {
          number: number,
          orderBy: orderBy,
          text: inputValue
        });
  }

  killProcess(pid: number) {
    return this.http
      .post(environment.processKillUrl, {'pid': pid}, this.postOptions)
      .pipe(map(data => data));
  }

}
