import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  Task,
  TextInput,
  TextInputChangeEventData,
  View,
  StyleSheet,
} from 'react-native';
import {Timer} from './Timer';

interface AddTaskFormProps {
  onSubmit: (task: Task) => void;
}

export const AddTaskForm = ({}: AddTaskFormProps) => {
  const [value, setValue] = useState('');

  const onTaskNameChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(event.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameColumn}>
        <TextInput
          placeholder="Nazwa"
          value={value}
          onChange={onTaskNameChange}
          placeholderTextColor="white"
          style={styles.nameInput}
        />
      </View>
      <View style={styles.timeColumn}>
        <Timer onStop={() => null} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
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
  },
  timeColumn: {
    display: 'flex',
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
