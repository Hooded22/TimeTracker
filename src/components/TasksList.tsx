import React from 'react';
import {FlatList} from 'react-native';
import {Task} from '../types/task';
import {TaskItem} from './TaskItem';

interface TasksListProps {
  data: Task[];
}

export const TasksList = ({data}: TasksListProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <TaskItem key={`${item.name}-${item.startHour}`} {...item} />
      )}
    />
  );
};
