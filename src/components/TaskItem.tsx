import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Task} from '../types/task';

interface TaskItemProps extends Task {}

export const TaskItem = ({name, time, endHour, startHour}: TaskItemProps) => {
  return (
    <View style={styles.taskListItem}>
      <View style={styles.nameColumn}>
        <Text>{name}</Text>
        <Text>{`${startHour.toDateString()} - ${endHour.toDateString()}`}</Text>
      </View>
      <View style={styles.timeColumn}>
        <Text>{time}</Text>
      </View>
    </View>
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
  nameColumn: {
    flex: 0.7,
    flexDirection: 'column',
  },
  timeColumn: {
    flex: 0.3,
  },
});
