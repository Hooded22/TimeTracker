export type Time = number;

export interface Task {
  name: string;
  time: Time;
  startHour: Date;
  endHour: Date;
}
