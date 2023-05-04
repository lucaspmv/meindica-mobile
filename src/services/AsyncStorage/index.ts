import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeyEnum } from '@enums/AsyncStorageKeyEnum';

export const setItem = async (
  key: AsyncStorageKeyEnum,
  value: any
): Promise<void> => {
  await AsyncStorage.setItem(`@meindica:${key}`, JSON.stringify({ value }));
};

export const getItem = async <T = string>(
  key: AsyncStorageKeyEnum
): Promise<T | undefined> => {
  try {
    const value = await AsyncStorage.getItem(`@meindica:${key}`);

    if (value === null) {
      return undefined;
    }

    const valueObject = JSON.parse(value) as { value: T };

    return valueObject.value;
  } catch {
    return undefined;
  }
};

export const removeItem = async (key: AsyncStorageKeyEnum) => {
  await AsyncStorage.removeItem(`@meindica:${key}`);
};
