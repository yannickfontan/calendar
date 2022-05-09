import {Weather} from './weather';

export interface Reminder {
  id?: number;
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
  weatherInfo?: Weather[];
}
