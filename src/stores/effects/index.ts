import { AtomEffect, DefaultValue } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistEffect = <T>(key: string): AtomEffect<T> => ({
  setSelf,
  onSet,
}) => {
  const loadData = async () => {
    const savedValue = await AsyncStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  };
  loadData();

  onSet(async (newValue: unknown) => {
    if (newValue instanceof DefaultValue) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
