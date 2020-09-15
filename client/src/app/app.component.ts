import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit, AfterViewInit {

  public title = 'Rostro - Remote hOST contROller';

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}`;
    this.renderer.appendChild(document.head, script);
  }

  ngAfterViewInit(): void { }

}
