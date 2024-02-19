import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function AccountDetailScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View>
      <Text>Account Detail</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}
