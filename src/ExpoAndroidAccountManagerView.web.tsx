import * as React from 'react';

import { ExpoAndroidAccountManagerViewProps } from './ExpoAndroidAccountManager.types';

export default function ExpoAndroidAccountManagerView(props: ExpoAndroidAccountManagerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
