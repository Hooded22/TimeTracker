import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateTime} from 'luxon';
import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {taskAsyncStoreageKeys} from '../assets/taskAsyncStorageKeys';
import {SavedTask, Task} from '../types/task';

export const useSaveTask = (onGetSavedTaskTime: (savedTask: Task) => void) => {
  const [taskToSave, setTaskToSave] = useState<SavedTask>();
  const appState = useRef(AppState.currentState);

  const removeTaskToSave = async () => {
    AsyncStorage.removeItem(taskAsyncStoreageKeys.CURRENT_TASK);
    setTaskToSave(undefined);
  };

  const appStateListener = useCallback(
    async (
      nextAppState: AppStateStatus,
      newTaskToSave: SavedTask | undefined,
    ) => {
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/) &&
        newTaskToSave
      ) {
        await AsyncStorage.setItem(
          taskAsyncStoreageKeys.CURRENT_TASK,
          JSON.stringify(newTaskToSave),
        );
      }

      if (nextAppState === 'active') {
        const savedTaskStringified = await AsyncStorage.getItem(
          taskAsyncStoreageKeys.CURRENT_TASK,
        );
        if (savedTaskStringified) {
          const savedTask = JSON.parse(savedTaskStringified);
          const taskToContinuingTracking: Task = {
            ...savedTask,
            time: calculateSavedTaskTime(savedTask),
          };
          onGetSavedTaskTime(taskToContinuingTracking);
        }
      }

      appState.current = nextAppState;
    },
    [onGetSavedTaskTime],
  );

  const calculateSavedTaskTime = (task: SavedTask) => {
    const timeDiff = DateTime.now()
      .diff(DateTime.fromISO(task.saveDate))
      .toMillis();
    return task.time + timeDiff;
  };

  useEffect(() => {
    const stateListener = AppState.addEventListener('change', nextAppState =>
      appStateListener(nextAppState, taskToSave),
    );

    return () => stateListener.remove();
  }, [appStateListener, taskToSave]);

  return {
    setTaskToSave: (newTaskToSave: Task) =>
      setTaskToSave({...newTaskToSave, saveDate: new Date().toISOString()}),
    removeTaskToSave,
    currentTaskStartHour: taskToSave,
  };
};
