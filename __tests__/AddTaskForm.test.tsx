import 'react-native';
import React from 'react';
import {AddTaskForm, AddTaskFormProps} from '../src/components/AddTaskForm';
import {render, screen, fireEvent, act} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

const mockDefaultProps: AddTaskFormProps = {
  onStart: jest.fn(),
  onSubmit: jest.fn(),
};

function renderAddTaskForm(props?: Partial<AddTaskFormProps>) {
  render(<AddTaskForm {...mockDefaultProps} {...props} />);
}

function isDisabled(element: ReactTestInstance | null): boolean {
  return !!element?.props.onStartShouldSetResponder?.testOnly_pressabilityConfig()
    ?.disabled;
}

describe('AddTaskForm test', () => {
  it('Should disable time button when name of task is not provided', () => {
    renderAddTaskForm();

    const timerButton = screen.getByTestId('timer-button');

    expect(isDisabled(timerButton)).toEqual(true);
  });
  it('Should enable timer button when user provide a name of task', async () => {
    renderAddTaskForm();

    const nameInput = screen.getByPlaceholderText('Podaj nazwe zadania');

    fireEvent.changeText(nameInput, 'Nazwa');

    const timerButton = await screen.findByTestId('timer-button');

    expect(isDisabled(timerButton)).toEqual(false);
  });
  it('Should call onSubmit with task name and timer time when user stop the button', async () => {
    jest.useFakeTimers();
    const onSubmitSpy = jest.fn();

    renderAddTaskForm({onSubmit: onSubmitSpy});

    fireEvent.changeText(
      screen.getByPlaceholderText('Podaj nazwe zadania'),
      'Nazwa',
    );
    const timerButton = await screen.findByTestId('timer-button');

    fireEvent.press(timerButton);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.press(timerButton);

    expect(onSubmitSpy).toHaveBeenCalledWith('Nazwa', 2000);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
