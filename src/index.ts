// Import the native module
import { Account } from "./ExpoAndroidAccountManager.types";
import ExpoAndroidAccountManagerModule from "./ExpoAndroidAccountManagerModule";

export function getAccounts(): Account[] {
  return ExpoAndroidAccountManagerModule.getAccounts();
}

export function getAccountsByType(type: string): Account[] {
  return ExpoAndroidAccountManagerModule.getAccountsByType(type);
}

export function addAccountExplicitly(
  accountType: string,
  accountName: string,
  password: string,
): boolean {
  return ExpoAndroidAccountManagerModule.addAccountExplicitly(
    accountType,
    accountName,
    password,
  );
}
