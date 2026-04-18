import Head from 'next/head';
import { useEffect, useState } from 'react';

import MonacoEditor, { loader } from '@willbooster/monaco-react';
import { mockMonaco } from '../fixtures/mockMonaco';

type LoaderConfig = Parameters<typeof loader.config>[0];

declare global {
  var __issue272StylesheetInjected: boolean | undefined;
}

loader.config({ monaco: mockMonaco as LoaderConfig['monaco'] });

export default function Issue272Page() {
  const [headRevision, setHeadRevision] = useState(0);
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [editorStatus, setEditorStatus] = useState('editor-pending');
  const [stylesheetCount, setStylesheetCount] = useState(0);
  const faviconHref = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ctext%3E${headRevision}%3C/text%3E%3C/svg%3E`;

  useEffect(() => {
    injectMonacoStylesheetOnce();
    setStylesheetCount(countMonacoStylesheets());
  }, [headRevision, isEditorVisible]);

  function remountEditorWithHeadChange() {
    setEditorStatus('editor-pending');
    setIsEditorVisible(false);
    setHeadRevision((currentRevision) => currentRevision + 1);
    requestAnimationFrame(() => setIsEditorVisible(true));
  }

  return (
    <>
      <Head>
        <title>Issue 272</title>
        <link key="favicon" rel="icon" href={faviconHref} />
      </Head>
      <main>
        <button type="button" onClick={remountEditorWithHeadChange}>
          Remount editor
        </button>
        <p data-testid="head-revision">{headRevision}</p>
        <p data-testid="stylesheet-count">{stylesheetCount}</p>
        <p data-testid="editor-status">{editorStatus}</p>
        {isEditorVisible && (
          <MonacoEditor
            height={120}
            defaultValue="const answer = 42;"
            defaultLanguage="typescript"
            onMount={(_, monaco) => {
              setStylesheetCount(countMonacoStylesheets());
              setEditorStatus(monaco === mockMonaco ? 'editor-ok' : 'editor-mismatch');
            }}
          />
        )}
      </main>
    </>
  );
}

function injectMonacoStylesheetOnce() {
  if (globalThis.__issue272StylesheetInjected) return;
  if (document.querySelector('link[data-name="vs/editor/editor.main"]')) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.dataset.name = 'vs/editor/editor.main';
  stylesheet.href = 'data:text/css,.issue272-monaco{}';
  document.head.append(stylesheet);
  globalThis.__issue272StylesheetInjected = true;
}

function countMonacoStylesheets() {
  return document.querySelectorAll('link[data-name="vs/editor/editor.main"]').length;
}
