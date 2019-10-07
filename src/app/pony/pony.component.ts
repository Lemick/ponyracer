import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;

  @Output() readonly ponyClicked: EventEmitter<PonyModel> = new EventEmitter();


  constructor() {}

  ngOnInit() {}

  getPonyImageUrl() {
    if (this.isRunning) {
      return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-running.gif`;
    } else {
      return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
    }
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}
