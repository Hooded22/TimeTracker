/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AddTaskForm} from './src/components/AddTaskForm';
import {TasksList} from './src/components/TasksList';
import {useTaskLogic} from './src/hooks/useTaskLogic';

const App = () => {
  const {addTask, setCurrentTask, choseTaskToEdit, data, taskToEdit, loading} =
    useTaskLogic();

  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <AddTaskForm
        onStart={setCurrentTask}
        onSubmit={addTask}
        taskToEdit={taskToEdit}
        key={taskToEdit?.id}
      />
      <TasksList
        dataLoading={loading}
        data={data}
        onPlayButtonPress={choseTaskToEdit}
      />
    </SafeAreaView>
  );
};

export default App;
