import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';


export const zustandStorage = createJSONStorage(() => AsyncStorage, {
  reviver: (key, value) => {
    if ((key === 'createdAt' || key === 'date') && (typeof value === 'string' || typeof value === 'number')) {
      return new Date(value);
    }
    return value;
  },
});
