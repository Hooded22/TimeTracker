import React from 'react';
import {FlatList} from 'react-native';
import {useModal} from '../hooks/useModal';
import {Task} from '../types/task';
import {TaskDetailsModal} from './TaskDetailsModal';
import {TaskItem} from './TaskItem';

interface TasksListProps {
  data: Task[];
}

export const TasksList = ({data}: TasksListProps) => {
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
