import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less']
})
export class ProgressBarComponent implements OnInit {

  private _value: number;
  get value(): number {
    return this._value;
  }
  @Input() // instead of watching on changes we use setter.
  set value(value: number) {
    this._value = value;
    this._value > this.warningTreshold ? this.backgroundColor = 'bg-warning' : this.backgroundColor = 'bg-success';
    this._value > this.errorTreshold ? this.backgroundColor = 'bg-danger' : this.backgroundColor = this.backgroundColor;
  }

  @Input() warningTreshold: number;
  @Input() errorTreshold: number;
  public backgroundColor: string;

  constructor() {
  }

  ngOnInit() {

  }

}
