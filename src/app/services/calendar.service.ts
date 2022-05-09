import {Injectable} from '@angular/core';
import {Reminder} from '../interfaces/reminder';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  reminders: Reminder[] = [];

  localStorageKey = 'yannick-calendar-reminders';

  constructor() {
  }

  create(data: Reminder): Reminder {
    this.loadReminders();
    data.id = this.getMaxId() + 1; // add one to the max id
    this.manageTimeZone(data);
    this.reminders.push(data);
    this.saveReminders();
    return data;
  }

  private getMaxId() {
    return this.reminders.map(r => r.id).sort((a, b) => a - b)[this.reminders.length - 1];
  }

  manageTimeZone(data: Reminder) {
    data.dateTime.setHours(data.dateTime.getHours() - (new Date().getTimezoneOffset() / 60));
  }

  edit(data: Reminder): Reminder {
    this.loadReminders();
    this.reminders = this.reminders.filter(rem => rem.id !== data.id);
    this.manageTimeZone(data);
    this.reminders.push(data);
    this.saveReminders();
    return data;
  }

  list(): Reminder[] {
    this.loadReminders();
    return this.reminders;
  }

  getReminders(date: Date) {
    return this.list().filter(rem => rem.dateTime.toString().slice(0, 10) === date.toISOString().slice(0, 10)).sort((r1, r2) => {
      return r1.dateTime > r2.dateTime ? 1 : (r1.dateTime < r2.dateTime) ? -1 : 0;
    });
  }

  delete(reminderId: number): boolean {
    this.loadReminders();
    this.reminders = this.reminders.filter((rem) => rem.id !== reminderId);
    this.saveReminders();
    return true;
  }

  loadReminders() {
    this.reminders = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  saveReminders() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.reminders));
  }

}
