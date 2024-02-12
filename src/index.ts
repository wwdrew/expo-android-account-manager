import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module
import {
  ChangeEventPayload,
  ExpoAndroidAccountManagerViewProps,
} from "./ExpoAndroidAccountManager.types";
import ExpoAndroidAccountManagerModule from "./ExpoAndroidAccountManagerModule";

// Get the native constant value.
export const PI = ExpoAndroidAccountManagerModule.PI;

export function hello(): string {
  return ExpoAndroidAccountManagerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAndroidAccountManagerModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  ExpoAndroidAccountManagerModule ??
    NativeModulesProxy.ExpoAndroidAccountManager,
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ExpoAndroidAccountManagerViewProps, ChangeEventPayload };
