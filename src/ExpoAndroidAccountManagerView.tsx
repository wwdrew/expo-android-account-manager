import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAndroidAccountManagerViewProps } from './ExpoAndroidAccountManager.types';

const NativeView: React.ComponentType<ExpoAndroidAccountManagerViewProps> =
  requireNativeViewManager('ExpoAndroidAccountManager');

export default function ExpoAndroidAccountManagerView(props: ExpoAndroidAccountManagerViewProps) {
  return <NativeView {...props} />;
}
