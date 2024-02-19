import {
  getAccounts,
  addAccountExplicitly,
  Account,
} from "expo-android-account-manager";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ACCOUNT_TYPE = "expo.modules.androidaccountmanager.example";

function CreateRandomAccount({ callback }: { callback: () => void }) {
  function createRandomAccount() {
    const random = Math.random().toString().substring(2, 8);

    try {
      addAccountExplicitly(
        {
          name: `account-name-${random}`,
          type: ACCOUNT_TYPE,
        },
        "password",
      );

      callback();
    } catch (error) {
      console.log({ error });
    }
  }

  return <Text onPress={createRandomAccount}>Create</Text>;
}

export default function AccountManagerHomeScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    setAccounts(getAccounts());
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Accounts",
          headerRight: () => (
            <CreateRandomAccount callback={() => setAccounts(getAccounts())} />
          ),
        }}
      />
      {accounts.length === 0 && <Text>No accounts</Text>}
      {accounts.map((account) => (
        <Link
          key={account.name}
          href={{
            pathname: "/account/[name]",
            params: { name: account.name },
          }}
        >
          {account.name}
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
