import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const retrieveData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        return null;
    }
}

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
}