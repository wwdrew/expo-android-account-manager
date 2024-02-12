import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAndroidAccountManager from 'expo-android-account-manager';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoAndroidAccountManager.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
