import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Task} from '../types/task';
import {
  convertHourToDisplayFormat,
  convertTimeToDisplayFormat,
} from '../utils/taskConverterts';
import PlayIcon from '../assets/icons/PlayIcon';

interface TaskItemProps extends Task {
  onPress: () => void;
  onPlayButtonPress: () => void;
  activeItem?: boolean;
}

export const TaskItem = ({
  name,
  time,
  endHour,
  startHour,
  activeItem,
  onPress,
  onPlayButtonPress,
}: TaskItemProps) => {
  const endHourToDisplay = convertHourToDisplayFormat(new Date(endHour));
  const startHouroDisplay = convertHourToDisplayFormat(new Date(startHour));
  const timeToDisplay = convertTimeToDisplayFormat(time);

  const onPlayButtonPressHandler = () => {
    onPlayButtonPress();
  };

  if (activeItem) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.taskListItem}>
        <View style={styles.nameColumn}>
          <Text style={styles.taskName}>{name}</Text>
          <Text
            style={
              styles.taskTime
            }>{`${startHouroDisplay} - ${endHourToDisplay}`}</Text>
        </View>
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{timeToDisplay}</Text>
          <TouchableOpacity
            hitSlop={{bottom: 10, top: 10, left: 5, right: 5}}
            onPress={onPlayButtonPressHandler}>
            <PlayIcon />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskListItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1.5,
  },
  taskName: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'white',
  },
  taskTime: {
    color: 'white',
  },
  nameColumn: {
    flex: 0.7,
    flexDirection: 'column',
  },
  timeColumn: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeText: {
    marginRight: 10,
    color: 'white',
  },
});
