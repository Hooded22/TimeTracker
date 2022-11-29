import {DateTime, Duration} from 'luxon';
import {useEffect, useState} from 'react';
import {Task, TaskToAdd, Time} from '../types/task';
import {useSaveTask} from './useSavingCurrentTask';
import {useTaskController} from './useTaskController';
import uuid from 'react-native-uuid';

export const useTaskLogic = () => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const {getTasksData, addTask, tasksData, loading} = useTaskController();
  const {setTaskToSave, removeTaskToSave} = useSaveTask(setTaskToEdit);

  useEffect(() => {
    getTasksData();
  }, [getTasksData]);

  const createTaskToAdd = (
    name: string,
    startHour: Date,
    endHour: Date,
    time?: Time,
  ): TaskToAdd => {
    return {
      id: uuid.v4().toString(),
      name: name,
      time: time
        ? time
        : DateTime.fromJSDate(endHour)
            .diff(DateTime.fromJSDate(startHour))
            .toMillis(),
      endHour: endHour,
      startHour: startHour,
    };
  };

  const addTaskHandler = (name: string, time: Time) => {
    const startHour = DateTime.now()
      .minus(Duration.fromMillis(time))
      .toJSDate();
    const endHour = new Date();

    const taskToAdd = taskToEdit
      ? {
          id: taskToEdit.id,
          name: name,
          time: time,
          startHour: new Date(taskToEdit.startHour),
          endHour: new Date(),
        }
      : createTaskToAdd(name, startHour, endHour, time);

    addTask(taskToAdd);
    removeTaskToSave();
    setTaskToEdit(null);
  };

  const setCurrentTaskHandler = (name: string) => {
    setTaskToSave({
      name,
      startHour: new Date().toISOString(),
      endHour: new Date().toISOString(),
      id: uuid.v4().toString(),
      time: 0,
    });
  };

  const choseTaskToEditHandler = (task: Task) => {
    setTaskToEdit(task);
    setTaskToSave(task);
  };

  return {
    data: tasksData,
    addTask: addTaskHandler,
    setCurrentTask: setCurrentTaskHandler,
    choseTaskToEdit: choseTaskToEditHandler,
    taskToEdit,
    loading,
  };
};
