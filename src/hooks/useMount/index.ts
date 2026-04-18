import { useEffect } from 'react';
import type { EffectCallback } from 'react';

function useMount(effect: EffectCallback): void {
  useEffect(effect, []);
}

export default useMount;
