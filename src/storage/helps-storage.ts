import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetUserById200HelpsItem } from '@/services/api/schemas';

const HELPS_STORAGE_KEY = "neuryncapp@helps";

async function get(): Promise<GetUserById200HelpsItem[]> {
  const storage = await AsyncStorage.getItem(HELPS_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : null;

  return response;
}

async function save(helps: GetUserById200HelpsItem[]) {
  const userString = JSON.stringify(helps);
  return await AsyncStorage.setItem(HELPS_STORAGE_KEY, userString);
}

async function logout() {
  return await AsyncStorage.removeItem(HELPS_STORAGE_KEY);
}

const helpsStorage = { get, save, logout };

export { helpsStorage };