import { use, useSyncExternalStore } from 'react';

import type { Monaco } from '../..';
import initMonaco from './initMonaco';

function useMonaco(): Monaco | undefined {
  const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!isHydrated) {
    return undefined;
  }

  return use(initMonaco());
}

function subscribe(onStoreChange: () => void): () => void {
  const timeoutId = setTimeout(onStoreChange, 0);

  return () => {
    clearTimeout(timeoutId);
  };
}

function getClientSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

export default useMonaco;
