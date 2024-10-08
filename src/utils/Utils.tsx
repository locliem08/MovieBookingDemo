import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';


// -- Custom AynsStore
export async function getStorage<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
    try {
        const temp = await AsyncStorage.getItem(key);
        if (temp === null) {
            return defaultValue;
        }
        return JSON.parse(temp) as T;
    } catch (error) {
        return defaultValue;
    }
}

export async function setStorage<T>(key: string, value: T): Promise<void> {
    try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
        console.error('Set AsyncStorage error:', error);
    }
}
