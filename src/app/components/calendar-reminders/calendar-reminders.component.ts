import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Reminder} from '../../interfaces/reminder';

@Component({
  selector: 'app-calendar-reminders',
  template: `
    <div class="calendar-reminders">
      <div class="reminder-wrapper" *ngFor="let rem of reminders" (click)="selectReminder(rem)">
        <div class="reminder-badge" [style.background-color]="rem.color"></div>
        <div class="reminder-preview" [style.border-color]="rem.color">
          {{ rem.dateTime.toString().slice(11, 16) }} {{rem.text}}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./calendar-reminders.component.scss']
})
export class CalendarRemindersComponent {

  @Input()
  reminders: Reminder[];
  @Output() call = new EventEmitter();

  constructor() {
  }

  selectReminder(reminder) {
    this.call.emit(reminder);
  }

}
