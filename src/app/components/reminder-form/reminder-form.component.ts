import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Reminder} from 'src/app/interfaces/reminder';
import {CalendarService} from 'src/app/services/calendar.service';
import {CityService} from 'src/app/services/city.service';
import {WeatherService} from 'src/app/services/weather.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReminderFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<any>,
              private calendarService: CalendarService,
              private cityService: CityService,
              private weatherService: WeatherService) {
    this.dateStr = new Date().toISOString().slice(0, 16);
  }

  public msg: string;
  public dateStr: string;
  public reminder: Reminder;
  public reminders: Reminder[];
  public hourStr: string;
  public imageUrl: string;
  public cities: string[];

  ngOnInit(): void {
    this.dateStr = this.convertDateToString(this.data.date);
    this.reminder = this.data.reminder;
    this.msg = this.data.msg;
    this.imageUrl = environment.imageUrl;

    if (!this.dateStr) {
      this.data.date = new Date();
      const timeToAdd = this.data.date.getHours() + 1;
      const Hours = (timeToAdd > 23) ? timeToAdd - 23 : timeToAdd;
      this.data.date.setHours(Hours - (this.data.date.getTimezoneOffset() / 60));
      this.dateStr = this.convertDateToString(this.data.date);
    }

    if (this.reminder && this.reminder.city && !this.reminder.weatherInfo) {
      this.setWeather(this.reminder.city);
    }

    if (!this.reminder) {
      this.reminder = {color: '#adadad', dateTime: this.data.date, text: ''};
    }

    this.dialogRef.updateSize('60%');
    this.cities = this.cityService.list();
    this.setDateStr();
    this.onChangeDate();
  }

  loadReminders() {
    this.reminders = this.calendarService.getReminders(this.data.date);
  }

  onChangeCity(e) {
    this.setWeather(e);
  }

  onChangeDate($event?) {
    console.log(this.dateStr);
    if ($event) {
      this.dateStr = $event.target.value;
      this.data.date = new Date(this.dateStr);
      console.log($event);
      console.log(this.dateStr);
    }
    this.loadReminders();
    this.setHourStr();
  }

  filterRemindersByTime(time: number): Reminder[] {
    return this.reminders.filter(rem => +rem.dateTime.toString().slice(11, 13) === time);
  }

  setReminder(remind: Reminder) {
    this.msg = null;
    this.reminder = remind;
    this.setDateStrAndHourStr();
    if (this.reminder && this.reminder.city && !this.reminder.weatherInfo) {
      this.setWeather(this.reminder.city);
    }
  }

  private setDateStrAndHourStr() {
    this.setDateStr();
    this.setHourStr();
  }

  private setDateStr() {
    this.dateStr = this.convertDateToString(this.reminder.dateTime);
  }

  private setHourStr() {
    this.hourStr = `${+this.dateStr.slice(11, 13)}`;
  }

  newReminder() {
    this.msg = null;
    this.reminder = {color: '#adadad', dateTime: this.data.date, text: ''};
    this.onChangeDate();
  }

  setWeather(city: string) {
    this.reminder.city = city;
    this.weatherService.getWeather(city)
      .subscribe(res => {
        this.reminder.weatherInfo = res.weather;
      }, err => {
        this.reminder.weatherInfo = [{description: 'weather not found'}];
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.calendarService.delete(this.reminder.id);
    this.msg = 'Your reminder has been deleted.';
    this.loadReminders();
  }

  isDisabled() {
    return !this.reminder.text || !this.dateStr || !this.reminder.city || !this.reminder.color;
  }

  today() {
    return new Date();
  }

  saveAction() {
    this.reminder.dateTime = new Date(this.dateStr);
    if (this.reminder.id == null) {
      this.calendarService.create(this.reminder);
      this.msg = 'Your reminder is created';
      this.loadReminders();
      return;
    }
    this.calendarService.edit(this.reminder);
    this.msg = 'Your reminder is saved';
    this.loadReminders();
    return;
  }

  convertDateToString(date: Date | string) {
    if (!date) {
      return null;
    }
    if (typeof date === 'string') {
      return date.slice(0, 16);
    }
    return date.toISOString().slice(0, 16);
  }
}
