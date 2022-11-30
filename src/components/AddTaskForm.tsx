import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Alert} from 'react-native';
import {Task, Time} from '../types/task';
import {Timer} from './Timer';
import {tasksErrors} from '../assets/taskErrorsDictionary';

export interface AddTaskFormProps {
  onSubmit: (name: string, time: Time) => void;
  onStart: (taskName: string) => void;
  taskToEdit?: Task | null;
}

export const AddTaskForm = ({
  onSubmit,
  onStart,
  taskToEdit,
}: AddTaskFormProps) => {
  const [value, setValue] = useState(taskToEdit?.name || '');
  const nameIsEmpty = !value;
  const timerIsActiveByDefault = !!taskToEdit;

  const onSubmitHandler = (time: Time) => {
    try {
      validateName(value);
      addNewTask(time);
      clearName();
    } catch (error: any) {
      Alert.alert(error?.message);
    }
  };

  const clearName = () => {
    setValue('');
  };

  const validateName = (name: string) => {
    if (!name) {
      throw new Error(tasksErrors.TASK_NAME_CANNOT_BE_EMPTY);
    }
  };

  const addNewTask = (time: Time) => {
    onSubmit(value, time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameColumn}>
        <TextInput
          defaultValue={taskToEdit?.name}
          placeholder="Podaj nazwe zadania"
          value={value}
          onChangeText={setValue}
          placeholderTextColor="#ccc"
          style={styles.nameInput}
        />
      </View>
      <View style={styles.timeColumn}>
        <Timer
          onStop={onSubmitHandler}
          onStart={() => onStart(value)}
          disabled={nameIsEmpty}
          defaultActive={timerIsActiveByDefault}
          defaultTime={taskToEdit?.time}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'black',
  },
  nameColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 14,
    display: 'flex',
    flex: 0.4,
  },
  nameInput: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: 5,
    marginBottom: 4,
  },
  timeColumn: {
    display: 'flex',
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
