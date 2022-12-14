import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useModal} from '../hooks/useModal';
import {Task} from '../types/task';
import {TaskDetailsModal} from './TaskDetailsModal';
import {TaskItem} from './TaskItem';

interface TasksListProps {
  data: Task[];
  dataLoading: boolean;
  taskToEdit: Task | null;
  onPlayButtonPress: (task: Task) => void;
}

export const TasksList = ({
  data,
  dataLoading,
  taskToEdit,
  onPlayButtonPress,
}: TasksListProps) => {
  const {isOpen, openModal, closeModal, param} = useModal<Task>();

  const showTaskDetails = (chosenTask: Task) => {
    openModal(chosenTask);
  };

  if (dataLoading) {
    return <Text>Ładowanie danych</Text>;
  }

  return (
    <>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatListContentContainer}
        renderItem={({item}) => (
          <TaskItem
            onPlayButtonPress={() => onPlayButtonPress(item)}
            key={item.id}
            {...item}
            onPress={() => showTaskDetails(item)}
            activeItem={!!taskToEdit && taskToEdit.id === item.id}
          />
        )}
      />
      <TaskDetailsModal task={param} visible={isOpen} onClose={closeModal} />
    </>
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 80,
  },
});
