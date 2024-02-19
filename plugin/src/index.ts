import { ConfigPlugin } from "@expo/config-plugins";

import { withAccountManagerService } from "./android/withAccountManagerService";
import { withAuthenticatorXml } from "./android/withAuthenticatorXml";

export const withAccountManagerConfig: ConfigPlugin = (config) => {
  config = withAccountManagerService(config);
  config = withAuthenticatorXml(config);

  return config;
};

export default withAccountManagerConfig;
