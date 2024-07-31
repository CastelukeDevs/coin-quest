import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_ID = process.env.EXPO_PUBLIC_SECRET ?? "public";

export const saveToken = async (token: string) => {
  console.log("saving token");

  await AsyncStorage.setItem(TOKEN_ID, token).then((res) => {
    console.log("token saved");
  });
};

export const forgetToken = async () => {
  await AsyncStorage.removeItem(TOKEN_ID);
};

export const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_ID);
    return token ? token : null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
