/// <reference types="@types/googlemaps" />

import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.less']
})
export class GmapComponent  implements OnInit {
  @ViewChild('gmap', null) gmapElement: any;
  map: google.maps.Map;

  @Input() lat: number;
  @Input() long: number;

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(this.lat ? this.lat : 40.6, this.long ? this.long : 16.6),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
