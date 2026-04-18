import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';

function useUpdate(effect: EffectCallback, deps: DependencyList, applyChanges = true): void {
  const isInitialMount = useRef(true);

  useEffect(
    isInitialMount.current || !applyChanges
      ? () => {
          isInitialMount.current = false;
        }
      : effect,
    deps
  );
}

export default useUpdate;
