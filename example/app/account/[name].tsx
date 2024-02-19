import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function AccountDetailScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: name }} />
      <Text>Account Detail</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}
