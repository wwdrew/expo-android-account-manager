import {
  getAccounts,
  addAccountExplicitly,
  Account,
} from "expo-android-account-manager";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export const ACCOUNT_TYPE = "expo.modules.androidaccountmanager.example";

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

function ItemSeparator() {
  return (
    <View
      style={{ height: StyleSheet.hairlineWidth, backgroundColor: "black" }}
    />
  );
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
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Link
            asChild
            key={item.name}
            href={{
              pathname: "/account/[name]",
              params: { name: item.name },
            }}
          >
            <Pressable style={styles.accountItem}>
              <Text>{item.name}</Text>
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={<Text>No accounts</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  accountItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
