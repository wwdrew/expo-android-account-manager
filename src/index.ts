import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAndroidAccountManager.web.ts
// and on native platforms to ExpoAndroidAccountManager.ts
import ExpoAndroidAccountManagerModule from './ExpoAndroidAccountManagerModule';
import ExpoAndroidAccountManagerView from './ExpoAndroidAccountManagerView';
import { ChangeEventPayload, ExpoAndroidAccountManagerViewProps } from './ExpoAndroidAccountManager.types';

// Get the native constant value.
export const PI = ExpoAndroidAccountManagerModule.PI;

export function hello(): string {
  return ExpoAndroidAccountManagerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAndroidAccountManagerModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAndroidAccountManagerModule ?? NativeModulesProxy.ExpoAndroidAccountManager);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAndroidAccountManagerView, ExpoAndroidAccountManagerViewProps, ChangeEventPayload };
