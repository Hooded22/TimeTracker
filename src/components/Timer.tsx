import {Duration} from 'luxon';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {Time} from '../types/task';

interface TimerProps {
  onStop: (time: Time) => void;
  onStart: () => void;
  disabled?: boolean;
  defaultTime?: Time;
  defaultActive?: boolean;
}

export const Timer = ({
  onStop,
  onStart,
  disabled,
  defaultTime,
  defaultActive,
}: TimerProps) => {
  const [time, setTime] = useState<Time>(defaultTime || 0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const onTimerButtonPress = () => {
    if (isActive) {
      onButtonStopPress();
    } else {
      onStart();
      setIntervalForTimeer();
    }
    setIsActive(currentState => !currentState);
  };

  const increaseTimerSecond = () => {
    setTime(currentTime => currentTime + 1000);
  };

  function onButtonStopPress() {
    intervalRef.current && clearInterval(intervalRef.current);
    onStop(time);
    setTime(0);
  }

  const setIntervalForTimeer = useCallback(() => {
    intervalRef.current = setInterval(() => increaseTimerSecond(), 1000);
  }, []);

  const disabledButtonStyles = (): ViewStyle => {
    return {
      opacity: disabled ? 0.5 : 1,
    };
  };

  useEffect(() => {
    if (defaultActive) {
      setIntervalForTimeer();
      setIsActive(currentState => !currentState);
    }
  }, [defaultActive, setIntervalForTimeer]);

  return (
    <>
      <Text style={styles.timeText}>
        {Duration.fromMillis(time).toFormat('hh:mm:ss')}
      </Text>
      <TouchableOpacity
        testID="timer-button"
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
