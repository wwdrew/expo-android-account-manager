import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
} from "expo/config-plugins";

export const withAccountManagerService: ConfigPlugin = (expoConfig) => {
  expoConfig = withAndroidManifest(expoConfig, (config) => {
    const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

    const mainApplication = getMainApplicationOrThrow(config.modResults);

    const service = {
      $: {
        "android:name":
          "expo.modules.androidaccountmanager.ExpoAccountManagerAuthenticatorService",
        "android:exported": "false" as AndroidConfig.Manifest.StringBoolean,
      },
      "intent-filter": [
        {
          action: [
            {
              $: {
                "android:name": "android.accounts.AccountAuthenticator",
              },
            },
          ],
        },
      ],
      "meta-data": [
        {
          $: {
            "android:name": "android.accounts.AccountAuthenticator",
            "android:resource": "@xml/authenticator",
          },
        },
      ],
    };

    if (mainApplication.service) {
      mainApplication.service.push(service);
    } else {
      mainApplication.service = [service];
    }

    return config;
  });

  return expoConfig;
};
