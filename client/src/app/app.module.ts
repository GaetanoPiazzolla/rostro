import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SystemInfoService} from '../services/systeminfo.service';
import {SocketService} from '../services/socket.service';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {ServiceWorkerModule} from '@angular/service-worker';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GmapComponent} from './gmap/gmap.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {HostInfoComponent} from './host-info/host-info.component';
import {ProcesslistComponent} from './processlist/processlist.component';
import {FormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../interceptor/token-interceptor';
import {AuthService} from '../services/auth.service';
import {WateringSerivce} from '../services/watering.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GmapComponent,
    ProgressBarComponent,
    HostInfoComponent,
    ProcesslistComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: true, registrationStrategy: 'registerImmediately'}),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent}
    ]),
    FormsModule
  ],
  providers: [
    SystemInfoService, SocketService, AuthService, WateringSerivce,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
