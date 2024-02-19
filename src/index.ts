// Import the native module
import { Account } from "./ExpoAndroidAccountManager.types";
import ExpoAndroidAccountManagerModule from "./ExpoAndroidAccountManagerModule";

export * from "./ExpoAndroidAccountManager.types";

export const KEY_ACCOUNT_NAME: string =
  ExpoAndroidAccountManagerModule.KEY_ACCOUNT_NAME;
export const KEY_PASSWORD: string =
  ExpoAndroidAccountManagerModule.KEY_PASSWORD;
export const KEY_AUTHTOKEN: string =
  ExpoAndroidAccountManagerModule.KEY_AUTHTOKEN;

export function getAccounts(): Account[] {
  return ExpoAndroidAccountManagerModule.getAccounts();
}

export function getAccountsByType(type: string): Account[] {
  return ExpoAndroidAccountManagerModule.getAccountsByType(type);
}

export function addAccountExplicitly(
  account: Account,
  password: string,
): boolean {
  return ExpoAndroidAccountManagerModule.addAccountExplicitly(
    account,
    password,
  );
}

export function removeAccount(account: Account) {
  ExpoAndroidAccountManagerModule.removeAccount(account);
}

export function setAuthToken(
  account: Account,
  accountType: string,
  authToken: string,
) {
  ExpoAndroidAccountManagerModule.setAuthToken(account, accountType, authToken);
}

export function setUserData(account: Account, key: string, value: string) {
  ExpoAndroidAccountManagerModule.setUserData(account, key, value);
}

export function getUserData(account: Account, key: string): string {
  return ExpoAndroidAccountManagerModule.setUserData(account, key);
}

export function peekAuthToken(account: Account, accountType: string): string {
  return ExpoAndroidAccountManagerModule.peekAuthToken(account, accountType);
}
