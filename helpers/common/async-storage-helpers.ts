import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveJsonFromAsyncStorage = async <ResultType>(
  key: string
): Promise<ResultType | undefined> => {
  const resultStr = await AsyncStorage.getItem(key);
  if (!resultStr || resultStr.length <= 0) {
    return;
  }
  return JSON.parse(resultStr) as ResultType;
};

export const storeJsonInAsyncStorage = async <ItemType>(
  key: string,
  item: ItemType
) => {
  await AsyncStorage.setItem(key, JSON.stringify(item));
};
