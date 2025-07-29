import type { IUserPayload } from "@/interfaces/IUserPayload";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_STORAGE_KEY = "neuryncapp@user";

async function get(): Promise<IUserPayload | null> {
  const storage = await AsyncStorage.getItem(USER_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : null;

  return response;
}

async function save(user: IUserPayload) {
  const userString = JSON.stringify(user);
  return await AsyncStorage.setItem(USER_STORAGE_KEY, userString);
}

async function logout() {
  return await AsyncStorage.removeItem(USER_STORAGE_KEY);
}

const userStorage = { get, save, logout };

export { userStorage };