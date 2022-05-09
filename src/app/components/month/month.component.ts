import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-month',
  template: `
    <div class="month-wrapper">
      <span (click)="nextMonth()" class="material-icons arrows">arrow_left</span>
      <span class="month ">{{date.getFullYear()}} {{monthStr}}</span>
      <span (click)="previousMonth()" class="material-icons arrows">arrow_right</span>
    </div>
    `,
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  date: Date;
  @Output() changed = new EventEmitter();
  monthStr: string;

  constructor() {
  }

  ngOnInit(): void {
    this.date = new Date();
    this.monthStr = this.date.toLocaleString(navigator.language, {month: 'long'});
  }

  nextMonth() {
    this.changeMonth(-1);
  }

  previousMonth() {
    this.changeMonth(1);
  }

  changeMonth(modifier) {
    this.date.setMonth(this.date.getMonth() + modifier);
    this.monthStr = this.date.toLocaleString(navigator.language, {month: 'long'});
    this.changed.emit(this.date);
  }

}
