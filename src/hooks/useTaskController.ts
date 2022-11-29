import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {taskAsyncStoreageKeys} from '../assets/taskAsyncStorageKeys';
import {tasksErrors} from '../assets/taskErrorsDictionary';
import {Task, TaskToAdd} from '../types/task';

export const useTaskController = () => {
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const getTasksData = useCallback(async () => {
    setLoading(true);
    try {
      const dataINJSONString = await AsyncStorage.getItem(
        taskAsyncStoreageKeys.TASKS_LIST,
      );
      if (dataINJSONString) {
        const data = JSON.parse(dataINJSONString);
        setTasksData(sortTasksByStartHour(data));
      } else {
        setTasksData([]);
      }
    } catch (error) {
      Alert.alert(tasksErrors.GET_DATA_ERROR);
      setTasksData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTaskIntoDataArrayOrUpdateExisting = useCallback(
    (task: TaskToAdd) => {
      const indexOfTask = tasksData.findIndex(item => item.id === task.id);
      if (indexOfTask === -1) {
        return [...tasksData, task];
      } else {
        const dataCopy: (Task | TaskToAdd)[] = [...tasksData];
        dataCopy[indexOfTask] = task;
        return dataCopy;
      }
    },
    [tasksData],
  );

  const addTask = useCallback(
    async (newTask: TaskToAdd) => {
      const newData = addTaskIntoDataArrayOrUpdateExisting(newTask);
      console.log('NEW DATA: ', newData);
      try {
        await AsyncStorage.setItem(
          taskAsyncStoreageKeys.TASKS_LIST,
          JSON.stringify(newData),
        );
        await getTasksData();
      } catch (error) {
        Alert.alert(tasksErrors.ADD_TASK_ERROR);
      }
    },
    [addTaskIntoDataArrayOrUpdateExisting, getTasksData],
  );

  const sortTasksByStartHour = (tasksToSort: Task[]) => {
    return tasksToSort.sort((prev, next) => {
      return new Date(prev.startHour) < new Date(next.startHour) ? 1 : -1;
    });
  };

  return {
    addTask,
    getTasksData,
    loading,
    tasksData,
  };
};
