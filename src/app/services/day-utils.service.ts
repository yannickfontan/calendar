import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayUtilsService {

  constructor() {
  }

  getSunday() {
    const date = new Date();
    const day = date.getDay();
    if (day !== 0) { // sunday is 0
      date.setHours(-(24 * day)); // go back to sunday
    }
    return date;
  }

  getDaysOfTheWeek(locale) {
    const baseDate = this.getSunday();
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(baseDate.toLocaleDateString(locale, {weekday: 'long'}));
      baseDate.setDate(baseDate.getDate() + 1); // add a day
    }
    return weekDays;
  }

  getDaysOfTheMonth(year: number, month: number): Date[] {
    if (month < 0) { // previous year
      year--;
      month = 11;
    }
    if (month > 11) { // next year
      year++;
      month = 0;
    }
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getDaysToDisplay(date: Date): Date[] {
    let previousMonth: Date[];
    let nextMonth: Date[];
    let datesDisplayed: Date[];
    datesDisplayed = this.getDaysOfTheMonth(date.getFullYear(), date.getMonth());
    previousMonth = this.getDaysOfTheMonth(date.getFullYear(), date.getMonth() - 1);
    nextMonth = this.getDaysOfTheMonth(date.getFullYear(), date.getMonth() + 1);
    datesDisplayed = this.addPreviousAndNext(previousMonth, datesDisplayed, nextMonth);
    return datesDisplayed;
  }

  addPreviousAndNext(previousMonth: Date[], datesDisplayed: Date[], nextMonth: Date[]) {
    previousMonth = previousMonth.slice((datesDisplayed[0].getDay()) * -1);
    previousMonth = (previousMonth.length > 6) ? [] : previousMonth;
    datesDisplayed = [...previousMonth, ...datesDisplayed];
    const limit = (datesDisplayed.length > 35) ? 42 : 35;
    nextMonth = nextMonth.slice(0, limit - datesDisplayed.length);
    return [...datesDisplayed, ...nextMonth];
  }
}
