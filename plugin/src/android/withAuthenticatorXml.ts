import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs";
import path from "path";

export const withAuthenticatorXml: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const packageName = config.android?.package;

      if (!packageName) {
        throw new Error("Package name not found in Expo config");
      }

      const authenticatorXml = `
<?xml version="1.0" encoding="utf-8"?>
<account-authenticator xmlns:android="http://schemas.android.com/apk/res/android"
    android:accountType="${packageName}"
    android:icon="@mipmap/ic_launcher"
    android:smallIcon="@mipmap/ic_launcher"
    android:label="@string/app_name"
/>
`;

      const directory = path.join(
        config.modRequest.projectRoot,
        "android",
        "app",
        "src",
        "main",
        "res",
        "xml",
      );
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(
        path.join(directory, "authenticator.xml"),
        authenticatorXml,
      );

      return config;
    },
  ]);
};
