import React from 'react';
import {FlatList} from 'react-native';
import {useModal} from '../hooks/useModal';
import {Task} from '../types/task';
import {TaskDetailsModal} from './TaskDetailsModal';
import {TaskItem} from './TaskItem';

interface TasksListProps {
  data: Task[];
  onPlayButtonPress: (task: Task) => void;
}

export const TasksList = ({data, onPlayButtonPress}: TasksListProps) => {
  const {isOpen, openModal, closeModal, param} = useModal<Task>();

  const showTaskDetails = (chosenTask: Task) => {
    openModal(chosenTask);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TaskItem
            onPlayButtonPress={() => onPlayButtonPress(item)}
            key={`${item.name}-${item.startHour}`}
            {...item}
            onPress={() => showTaskDetails(item)}
          />
        )}
      />
      <TaskDetailsModal task={param} visible={isOpen} onClose={closeModal} />
    </>
  );
};
