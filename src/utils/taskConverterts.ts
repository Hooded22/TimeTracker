import {DateTime} from 'luxon';
import {Time} from '../types/task';

export const convertHourToDisplayFormat = (hour: Date) =>
  DateTime.fromJSDate(hour).toFormat('HH:mm');

export const convertTimeToDisplayFormat = (time: Time) =>
  DateTime.fromMillis(time).toFormat('HH:mm:ss');
