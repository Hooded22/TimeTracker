import {DateTime, Duration} from 'luxon';
import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {TaskToAdd, Time} from '../types/task';
import {Timer} from './Timer';
import uuid from 'react-native-uuid';
import {tasksErrors} from '../assets/taskErrorsDictionary';

interface AddTaskFormProps {
  onSubmit: (task: TaskToAdd) => void;
}

export const AddTaskForm = ({onSubmit}: AddTaskFormProps) => {
  const [value, setValue] = useState('');
  const nameIsEmpty = !value;

  const onTaskNameChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(event.nativeEvent.text);
  };

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
    const newTask: TaskToAdd = {
      id: uuid.v4().toString(),
      name: value,
      time: time,
      endHour: new Date(),
      startHour: DateTime.now().minus(Duration.fromMillis(time)).toJSDate(),
    };
    onSubmit(newTask);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameColumn}>
        <TextInput
          placeholder="Podaj nazwe zadania"
          value={value}
          onChange={onTaskNameChange}
          placeholderTextColor="#ccc"
          style={styles.nameInput}
        />
      </View>
      <View style={styles.timeColumn}>
        <Timer onStop={onSubmitHandler} disabled={nameIsEmpty} />
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
