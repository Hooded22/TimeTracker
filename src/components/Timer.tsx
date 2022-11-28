import {DateTime} from 'luxon';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Time} from '../types/task';

interface TimerProps {
  onStop: (time: Time) => void;
}

export const Timer = ({onStop}: TimerProps) => {
  const [time, setTime] = useState<Time>(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const onTimerButtonPress = () => {
    if (isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      onStop(time);
    } else {
      intervalRef.current = setInterval(() => tick(), 1000);
    }
    setIsActive(currentState => !currentState);
  };

  const tick = () => {
    setTime(currentTime => currentTime + 1);
  };

  return (
    <>
      <Text style={styles.timeText}>
        {DateTime.fromObject({
          hour: 0,
          minute: 0,
          second: time,
        }).toFormat('HH:mm:ss')}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, isActive ? styles.stopButton : {}]}
        onPress={onTimerButtonPress}>
        <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
  timeText: {
    color: 'white',
    fontSize: 16,
  },
});
