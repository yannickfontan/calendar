import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarComponent} from './calendar/calendar.component';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import {ReminderFormComponent} from './reminder-form/reminder-form.component';
import {MonthComponent} from './month/month.component';
import {CalendarRemindersComponent} from './calendar-reminders/calendar-reminders.component';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    CalendarComponent,
    MonthComponent,
    CalendarRemindersComponent,
    ReminderFormComponent
  ],
  exports: [
    CalendarRemindersComponent,
    ReminderFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class CalendarModule {
}
