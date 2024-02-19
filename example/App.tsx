import {
  getAccounts,
  getAccountsByType,
  addAccountExplicitly,
} from "expo-android-account-manager";
import { Account } from "expo-android-account-manager/ExpoAndroidAccountManager.types";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SONGKICK_TYPE = "com.songkick";

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    setAccounts(getAccounts());
  }, []);

  function createRandomAccount() {
    console.log("createRandomAccount");
    const random = Math.random().toString().substring(2, 8);

    try {
      const success = addAccountExplicitly(
        `expo.modules.androidaccountmanager.example`,
        `account-name-${random}`,
        "password",
      );
      console.log(`added $random: ${success}`);
      console.log("getAccounts: ", getAccounts());
      setAccounts(getAccounts());
    } catch (error) {
      console.log({ error });
    }
  }

  function createSongkickAccount() {
    console.log("createAccount: ", SONGKICK_TYPE);
    console.log("getAccountsByType: ", getAccountsByType(SONGKICK_TYPE));
  }

  return (
    <View style={styles.container}>
      <Button onPress={createRandomAccount} title="Create random account" />
      <Button onPress={createSongkickAccount} title="Create Songkick account" />
      <Text>Accounts:</Text>
      {accounts.map((account) => (
        <Text key={account.name}>{account.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
