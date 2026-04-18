import type { Monaco } from '@willbooster/monaco-react';

const model = {
  uri: { path: '/e2e.ts' },
  dispose: () => {},
  getFullModelRange: () => ({}),
  isDisposed: () => false,
  setValue: () => {},
};

const codeEditor = {
  dispose: () => {},
  executeEdits: () => {},
  getModel: () => model,
  getOption: () => false,
  getValue: () => 'const answer = 42;',
  onDidChangeModelContent: () => ({ dispose: () => {} }),
  pushUndoStop: () => {},
  restoreViewState: () => {},
  revealLine: () => {},
  saveViewState: () => ({}),
  setModel: () => {},
  updateOptions: () => {},
};

const diffEditor = {
  dispose: () => {},
  getModel: () => ({ original: model, modified: model }),
  getModifiedEditor: () => codeEditor,
  getOriginalEditor: () => codeEditor,
  setModel: () => {},
  updateOptions: () => {},
};

export const mockMonaco = {
  editor: {
    create: () => codeEditor,
    createDiffEditor: () => diffEditor,
    createModel: () => model,
    EditorOption: {
      readOnly: 'readOnly',
    },
    getModel: () => {},
    getModelMarkers: () => [],
    onDidChangeMarkers: () => ({ dispose: () => {} }),
    setModelLanguage: () => {},
    setTheme: () => {},
  },
  Uri: {
    parse: (path: string) => ({ path }),
  },
} as unknown as Monaco;
