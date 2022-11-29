import {Duration} from 'luxon';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {Time} from '../types/task';

interface TimerProps {
  onStop: (time: Time) => void;
  disabled?: boolean;
}

export const Timer = ({onStop, disabled}: TimerProps) => {
  const [time, setTime] = useState<Time>(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const onTimerButtonPress = () => {
    if (isActive && intervalRef.current) {
      unsetInterval(intervalRef.current);
      onStop(time);
      clearTimer();
    } else {
      setIntervalForTimeer();
    }
    setIsActive(currentState => !currentState);
  };

  const increaseTimerSecond = () => {
    setTime(currentTime => currentTime + 1000);
  };

  const unsetInterval = (intervalId: number) => {
    clearInterval(intervalId);
    intervalRef.current = null;
  };

  const setIntervalForTimeer = () => {
    intervalRef.current = setInterval(() => increaseTimerSecond(), 1000);
  };

  const clearTimer = () => {
    setTime(0);
  };

  const disabledButtonStyles = (): ViewStyle => {
    return {
      opacity: disabled ? 0.5 : 1,
    };
  };

  console.log('DISABLE: ', disabled, disabledButtonStyles());
  return (
    <>
      <Text style={styles.timeText}>
        {Duration.fromMillis(time).toFormat('hh:mm:ss')}
      </Text>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={[
          styles.button,
          isActive ? styles.stopButton : {},
          {...disabledButtonStyles()},
        ]}
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
    height: '100%',
    width: 70,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
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
