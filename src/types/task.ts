export type Time = number;

export interface Task {
  id: string;
  name: string;
  time: Time;
  startHour: string;
  endHour: string;
}

export interface TaskToAdd extends Omit<Task, 'startHour' | 'endHour'> {
  startHour: Date;
  endHour: Date;
}

export interface SavedTask extends Task {
  saveDate: string;
}
