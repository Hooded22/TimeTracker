import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Task} from '../types/task';
import {
  convertHourToDisplayFormat,
  convertTimeToDisplayFormat,
} from '../utils/taskConverterts';

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
  const endHourToDisplay = convertHourToDisplayFormat(endHour);
  const startHouroDisplay = convertHourToDisplayFormat(startHour);
  const timeToDisplay = convertTimeToDisplayFormat(time);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.taskListItem}>
        <View style={styles.nameColumn}>
          <Text style={styles.taskName}>{name}</Text>
          <Text>{`${startHouroDisplay} - ${endHourToDisplay}`}</Text>
        </View>
        <View style={styles.timeColumn}>
          <Text>{timeToDisplay}</Text>
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
  },
});
