import {
  KEY_AUTHTOKEN,
  getUserData,
  peekAuthToken,
  removeAccountExplicitly,
  setAuthToken,
  setUserData,
} from "expo-android-account-manager";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { Button, Text, View } from "react-native";

import { ACCOUNT_TYPE } from "../index";

const DATA_KEY = "data_key";

export default function AccountDetailScreen() {
  const navigation = useNavigation();
  const { name } = useLocalSearchParams();

  function handleRemovePress() {
    try {
      removeAccountExplicitly({
        name: typeof name === "string" ? name : "",
        type: ACCOUNT_TYPE,
      });
      navigation.goBack();
    } catch (error) {
      console.log({ error });
    }
  }

  function handlePeekAuthTokenPress() {
    const authToken = peekAuthToken(
      {
        name: typeof name === "string" ? name : "",
        type: ACCOUNT_TYPE,
      },
      KEY_AUTHTOKEN,
    );

    console.log({ authToken });
  }

  function handleSetAuthTokenPress() {
    setAuthToken(
      {
        name: typeof name === "string" ? name : "",
        type: ACCOUNT_TYPE,
      },
      KEY_AUTHTOKEN,
      "authToken",
    );
  }

  function handleGetUserDataPress() {
    const userData = getUserData(
      {
        name: typeof name === "string" ? name : "",
        type: ACCOUNT_TYPE,
      },
      DATA_KEY,
    );

    console.log({ userData });
  }

  function handleSetUserDataPress() {
    setUserData(
      {
        name: typeof name === "string" ? name : "",
        type: ACCOUNT_TYPE,
      },
      DATA_KEY,
      "user data",
    );
  }

  return (
    <View>
      <Stack.Screen options={{ title: typeof name === "string" ? name : "" }} />
      <Text>Name: {name}</Text>
      <Button onPress={handleSetUserDataPress} title="Set User Data" />
      <Button onPress={handleGetUserDataPress} title="Get User Data" />
      <Button onPress={handleSetAuthTokenPress} title="Set Auth Token" />
      <Button onPress={handlePeekAuthTokenPress} title="Peek Auth Token" />
      <Button onPress={handleRemovePress} title="Remove" />
    </View>
  );
}
