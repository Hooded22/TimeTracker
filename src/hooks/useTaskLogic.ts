import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {taskAsyncStoreageKeys} from '../assets/taskAsyncStorageKeys';
import {tasksErrors} from '../assets/taskErrorsDictionary';
import {Task, TaskToAdd} from '../types/task';

export const useTaskLogic = () => {
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
        setTasksData(data);
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

  const addTask = useCallback(
    async (newTask: TaskToAdd) => {
      const newData = [...tasksData, newTask];
      try {
        await AsyncStorage.setItem(
          taskAsyncStoreageKeys.TASKS_LIST,
          JSON.stringify(newData),
        );
        getTasksData();
      } catch (error) {
        Alert.alert(tasksErrors.ADD_TASK_ERROR);
      }
    },
    [getTasksData, tasksData],
  );

  //   const updateTask = () => {};

  //   const sortTasksByStartHour = (tasksToSort: Task[]) => {};

  return {
    addTask,
    getTasksData,
    loading,
    tasksData,
  };
};
