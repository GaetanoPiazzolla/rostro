import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(username: string, password: string): Observable<void> {
    return this.http
      .post<any>(environment.loginUrl + '/',
        {
          username: username,
          password: password
        }).pipe(map((logResp) => {
          localStorage.setItem('token', logResp.token);
        }
      ));
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
