import { useEffect, useRef } from 'react';
import type { EffectCallback } from 'react';

function useMount(effect: EffectCallback): void {
  const effectRef = useRef(effect);

  useEffect(() => effectRef.current(), []);
}

export default useMount;
