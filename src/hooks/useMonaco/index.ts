import { useState } from 'react';
import loader from '@willbooster/monaco-loader';

import useMount from '../useMount';
import type { Monaco } from '../..';

function useMonaco(): Monaco | undefined {
  const [monaco, setMonaco] = useState<Monaco | undefined>(loader.__getMonacoInstance() as Monaco | undefined);

  useMount(() => {
    let cancelable: ReturnType<typeof loader.init>;

    if (!monaco) {
      cancelable = loader.init();

      void cancelable
        .then((monaco) => {
          setMonaco(monaco as Monaco);
          return;
        })
        .catch((error: unknown) => {
          if ((error as { type?: unknown })?.type !== 'cancelation') {
            console.error('Monaco initialization: error:', error);
          }
        });
    }

    return () => cancelable?.cancel();
  });

  return monaco;
}

export default useMonaco;
