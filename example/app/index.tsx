import {
  getAccounts,
  addAccountExplicitly,
  Account,
  removeAccount,
} from "expo-android-account-manager";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const ACCOUNT_TYPE = "expo.modules.androidaccountmanager.example";

export default function AccountManagerHomeScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    setAccounts(getAccounts());
  }, []);

  function createRandomAccount() {
    console.log("createRandomAccount");
    const random = Math.random().toString().substring(2, 8);

    try {
      const success = addAccountExplicitly(
        {
          name: `account-name-${random}`,
          type: ACCOUNT_TYPE,
        },
        "password",
      );
      console.log(`added ${random}: ${success}`);
      console.log("getAccounts: ", getAccounts());
      setAccounts(getAccounts());
    } catch (error) {
      console.log({ error });
    }
  }

  function handleRemoveAccount(accountName: string) {
    console.log("remove account: ", accountName);
    try {
      removeAccount({
        name: accountName,
        type: ACCOUNT_TYPE,
      });

      setAccounts(getAccounts());
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={createRandomAccount} title="Create random account" />
      <Text>Accounts:</Text>
      {accounts.length === 0 && <Text>No accounts</Text>}
      {accounts.map((account) => (
        <Link href={`/account/${account.name}`} key={account.name}>
          <Text>{account.name}</Text>
        </Link>
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
