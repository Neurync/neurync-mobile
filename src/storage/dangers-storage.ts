import type { GetUserById200DangersItem } from '@/services/api/schemas';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DANGERS_STORAGE_KEY = "neuryncapp@dangers";

async function get(): Promise<GetUserById200DangersItem[]> {
  const storage = await AsyncStorage.getItem(DANGERS_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : null;

  return response;
}

async function save(dangers: GetUserById200DangersItem[]) {
  const userString = JSON.stringify(dangers);
  return await AsyncStorage.setItem(DANGERS_STORAGE_KEY, userString);
}

async function logout() {
  return await AsyncStorage.removeItem(DANGERS_STORAGE_KEY);
}

const dangersStorage = { get, save, logout };

export { dangersStorage };

