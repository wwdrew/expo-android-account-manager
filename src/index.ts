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

export function removeAccount(accountName: string, accountType: string) {
  ExpoAndroidAccountManagerModule.removeAccount(accountName, accountType);
}

export function setAuthToken(
  accountName: string,
  accountType: string,
  authToken: string,
) {
  ExpoAndroidAccountManagerModule.setAuthToken(
    accountName,
    accountType,
    authToken,
  );
}

export function setUserData(
  accountName: string,
  accountType: string,
  key: string,
  value: string,
) {
  ExpoAndroidAccountManagerModule.setUserData(
    accountName,
    accountType,
    key,
    value,
  );
}

export function peekAuthToken(accountName: string, accountType: string) {
  const authToken = ExpoAndroidAccountManagerModule.peekAuthToken(
    accountName,
    accountType,
  );
  return authToken;
}
