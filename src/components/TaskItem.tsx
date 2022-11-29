import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Task} from '../types/task';
import {
  convertHourToDisplayFormat,
  convertTimeToDisplayFormat,
} from '../utils/taskConverterts';
import PlayIcon from '../assets/icons/PlayIcon';

interface TaskItemProps extends Task {
  onPress?: () => void;
}

export const TaskItem = ({
  name,
  time,
  endHour,
  startHour,
  onPress,
}: TaskItemProps) => {
  const endHourToDisplay = convertHourToDisplayFormat(new Date(endHour));
  const startHouroDisplay = convertHourToDisplayFormat(new Date(startHour));
  const timeToDisplay = convertTimeToDisplayFormat(time);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.taskListItem}>
        <View style={styles.nameColumn}>
          <Text style={styles.taskName}>{name}</Text>
          <Text>{`${startHouroDisplay} - ${endHourToDisplay}`}</Text>
        </View>
        <View style={styles.timeColumn}>
          <Text style={styles.timeText}>{timeToDisplay}</Text>
          <PlayIcon />
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
  },
});
