import {
  screen,
  render,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react-native';
import App from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {taskAsyncStoreageKeys} from '../src/assets/taskAsyncStorageKeys';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => '123-123-123'),
}));

describe('App tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it('Should save added task in Async Storage', async () => {
    const setItemSpy = AsyncStorage.setItem;
    render(<App />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Podaj nazwe zadania'),
      'Nazwa',
    );
    const timerButton = await screen.findByTestId('timer-button');

    fireEvent.press(timerButton);
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      fireEvent.press(timerButton);
    });

    expect(setItemSpy).toHaveBeenCalled();
  });
});
