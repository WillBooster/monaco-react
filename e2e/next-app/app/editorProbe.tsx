'use client';

import { useState } from 'react';

import MonacoEditor, { DiffEditor, loader, useMonaco, type Monaco } from '@willbooster/monaco-react';
import { mockMonaco } from '../fixtures/mockMonaco';

type LoaderConfig = Parameters<typeof loader.config>[0];
const monaco = mockMonaco;

loader.config({ monaco: monaco as LoaderConfig['monaco'] });

export default function EditorProbe() {
  const [editorStatus, setEditorStatus] = useState('editor-pending');
  const [diffStatus, setDiffStatus] = useState('diff-pending');
  const loadedMonaco = useMonaco();

  return (
    <>
      <p data-testid="hook-status">{loadedMonaco === monaco ? 'hook-ok' : 'hook-pending'}</p>
      <div data-testid="editor-status">{editorStatus}</div>
      <MonacoEditor
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
