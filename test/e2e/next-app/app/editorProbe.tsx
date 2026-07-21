'use client';

import { Suspense, useState } from 'react';

import MonacoEditor, { DiffEditor, useMonaco } from '@willbooster/monaco-react';

export default function EditorProbe() {
  const [editorStatus, setEditorStatus] = useState('editor-pending');
  const [diffStatus, setDiffStatus] = useState('diff-pending');

  return (
    <>
      <Suspense fallback={<p>hook-pending</p>}>
        <HookStatus />
      </Suspense>
      <div data-testid="editor-status">{editorStatus}</div>
      <MonacoEditor
        height={120}
        defaultValue="const answer = 42;"
        defaultLanguage="typescript"
        onMount={(editor, mountedMonaco) => {
          void editor;
          setEditorStatus(mountedMonaco.editor ? 'editor-ok' : 'editor-mismatch');
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
          setDiffStatus(mountedMonaco.editor ? 'diff-ok' : 'diff-mismatch');
        }}
      />
    </>
  );
}

function HookStatus() {
  const loadedMonaco = useMonaco();

  if (!loadedMonaco) {
    return <p data-testid="hook-status">hook-pending</p>;
  }

  return <p data-testid="hook-status">{loadedMonaco.editor ? 'hook-ok' : 'hook-mismatch'}</p>;
}
