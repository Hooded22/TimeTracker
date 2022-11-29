import {useEffect} from 'react';
import {AppState} from 'react-native';

interface useAppStateProps {
  onAppBecomeActive?: () => void;
  onAppBecomeBackground?: () => void;
}

export const useAppState = ({
  onAppBecomeActive,
  onAppBecomeBackground,
}: useAppStateProps) => {
  useEffect(() => {
    const stateListener = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        onAppBecomeBackground?.();
      }

      if (nextAppState === 'active') {
        onAppBecomeActive?.();
      }
    });

    return () => stateListener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};
