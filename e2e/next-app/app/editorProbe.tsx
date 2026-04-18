'use client';

import { useState } from 'react';

import Editor, { DiffEditor, loader, useMonaco, type Monaco } from '@willbooster/monaco-react';

type LoaderConfig = Parameters<typeof loader.config>[0];

const model = {
  uri: { path: '/e2e.ts' },
  dispose: () => {},
  getFullModelRange: () => ({}),
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

const monaco = {
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

loader.config({ monaco: monaco as LoaderConfig['monaco'] });

export default function EditorProbe() {
  const [editorStatus, setEditorStatus] = useState('editor-pending');
  const [diffStatus, setDiffStatus] = useState('diff-pending');
  const loadedMonaco = useMonaco();

  return (
    <>
      <p data-testid="hook-status">{loadedMonaco === monaco ? 'hook-ok' : 'hook-pending'}</p>
      <div data-testid="editor-status">{editorStatus}</div>
      <Editor
        height={120}
        defaultValue="const answer = 42;"
        defaultLanguage="typescript"
        onMount={(editor, mountedMonaco) => {
          void editor;
          setEditorStatus(mountedMonaco === monaco ? 'editor-ok' : 'editor-mismatch');
        }}
      />
      <div data-testid="diff-status">{diffStatus}</div>
      <DiffEditor
        height={120}
        original="const answer = 41;"
        modified="const answer = 42;"
        language="typescript"
        onMount={(editor, mountedMonaco) => {
          void editor;
          setDiffStatus(mountedMonaco === monaco ? 'diff-ok' : 'diff-mismatch');
        }}
      />
    </>
  );
}
