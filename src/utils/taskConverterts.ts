import {DateTime, Duration} from 'luxon';
import {Time} from '../types/task';

export const convertHourToDisplayFormat = (hour: Date) =>
  DateTime.fromJSDate(hour).toFormat('HH:mm:ss');

export const convertTimeToDisplayFormat = (time: Time) =>
  Duration.fromMillis(time).toFormat('hh:mm:ss');
