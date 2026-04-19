import loader from '@willbooster/monaco-loader';

import type { Monaco } from '../..';

let monacoPromise: Promise<Monaco> | undefined;

function initMonaco(): Promise<Monaco> {
  monacoPromise ??= loader.init() as Promise<Monaco>;
  return monacoPromise;
}

export default initMonaco;
