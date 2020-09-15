import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    // we need fucking clone because the HttpRequest is immutable
    // https://angular.io/guide/http#immutability
    if (token) {
      request = request.clone({setHeaders: {'Authorization': 'Bearer ' + token}});
    }

    return next.handle(request).pipe(tap(() => {
        // do nothing
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            alert('what the fuck, 0 HTTP code?');
          }
          if (err.status !== 401) {
            return;
          }
          this.authService.goToLogin();
        }
      }));

  }

}
