import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  Task,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface AddTaskFormProps {
  onSubmit: (task: Task) => void;
}

export const AddTaskForm = ({}: AddTaskFormProps) => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onTaskNameChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(event.nativeEvent.text);
  };

  const onTimerButtonPress = () => {
    if (isActive) {
      //onSubmit();
    }
    setIsActive(currentState => !currentState);
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
        <Text style={styles.timeText}>00:00:00</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, isActive ? styles.stopButton : {}]}
          onPress={onTimerButtonPress}>
          <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
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
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 14,
    marginLeft: 20,
    height: 50,
    width: 70,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
