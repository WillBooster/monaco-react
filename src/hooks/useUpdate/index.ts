import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';

function useUpdate(effect: EffectCallback, deps: DependencyList, applyChanges = true): void {
  const isInitialMount = useRef(true);
  const applyChangesRef = useRef(applyChanges);
  const effectRef = useRef(effect);

  applyChangesRef.current = applyChanges;
  effectRef.current = effect;

  useEffect(() => {
    if (isInitialMount.current || !applyChangesRef.current) {
      isInitialMount.current = false;
      return;
    }

    return effectRef.current();
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- useUpdate forwards caller-owned dependencies.
  }, deps);
}

export default useUpdate;
