import {Component, OnInit} from '@angular/core';
import {Reminder} from 'src/app/interfaces/reminder';
import {CalendarService} from 'src/app/services/calendar.service';
import {WeatherService} from 'src/app/services/weather.service';
import {MatDialog} from '@angular/material/dialog';
import {ReminderFormComponent} from '../reminder-form/reminder-form.component';

import {DayUtilsService} from '../../services/day-utils.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public dialogReference: any = null;
  days: string[];
  dates: Date[];
  date: Date;
  reminders: Reminder[];

  constructor(
    private dayUtilsService: DayUtilsService,
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadReminders();
    this.changeDate();
  }

  changeDate(inputDate?: Date) {
    this.date = inputDate || new Date();
    this.dates = this.getDaysToDisplay(this.date);
  }

  loadReminders() {
    this.reminders = this.calendarService.list();
  }

  getWeather(city: string) {
    return this.weatherService.getWeather(city);
  }

  openOneReminder(date: Date, reminder: Reminder ) {
    this.openReminder(date, reminder);
  }

  openReminder(date?: Date, reminder?: Reminder, msg?: string) {
    this.dialogReference = this.matDialog.open(ReminderFormComponent, {
      data: {date, reminder, msg},
    }).afterClosed().subscribe(() => {
      this.loadReminders();
    });
  }

  getPreviewedReminders(date: Date): Reminder[] {
    return this.calendarService.getReminders(date).slice(0, 3);
  }

  getMissingReminders(date: Date): number {
    return this.calendarService.getReminders(date).length - 3;
  }

  getDaysToDisplay(date: Date): Date[] {
    this.days = this.dayUtilsService.getDaysOfTheWeek(navigator.language);
    return this.dayUtilsService.getDaysToDisplay(date);
  }

  isOutside(d) {
    return d.getMonth() !== this.date.getMonth();
  }

  isWeekEnd(d) {
    return d.getDay() === 0 || d.getDay() === 6; // Sunday or Saturday
  }

  isPast(date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  }
}
