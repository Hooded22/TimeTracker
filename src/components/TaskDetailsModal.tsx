import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Task} from '../types/task';
import {
  convertHourToDisplayFormat,
  convertTimeToDisplayFormat,
} from '../utils/taskConverterts';

interface TaskDetailsModalProps {
  task: Task | undefined;
  visible: boolean;
  onClose: () => void;
}

export const TaskDetailsModal = ({
  task,
  visible,
  onClose,
}: TaskDetailsModalProps) => {
  if (!task) {
    return (
      <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
        <View>
          <Text>Brak danych</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{`Nazwa: ${task.name}`}</Text>
          <Text
            style={
              styles.modalText
            }>{`Godzina rozpoczęcia: ${convertHourToDisplayFormat(
            task.startHour,
          )}`}</Text>
          <Text
            style={
              styles.modalText
            }>{`Godzina zakończenia: ${convertHourToDisplayFormat(
            task.endHour,
          )}`}</Text>
          <Text style={styles.modalText}>{`Czas: ${convertTimeToDisplayFormat(
            task.time,
          )}`}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}>
            <Text style={styles.textStyle}>Zamknij</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
