import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2, private authService: AuthService) {
  }

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}`;
    this.renderer.appendChild(document.head, script);
  }

  ngAfterViewInit(): void {

  }

  logOut(): void {
    this.authService.logOut();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

}
