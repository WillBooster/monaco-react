import Head from 'next/head';
import { useEffect, useState } from 'react';

import MonacoEditor from '@willbooster/monaco-react';

export default function Issue272Page() {
  const [headRevision, setHeadRevision] = useState(0);
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [editorStatus, setEditorStatus] = useState('editor-pending');
  const [stylesheetCount, setStylesheetCount] = useState(0);
  const faviconHref = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ctext%3E${headRevision}%3C/text%3E%3C/svg%3E`;

  useEffect(() => {
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
              setEditorStatus(monaco.editor ? 'editor-ok' : 'editor-mismatch');
            }}
          />
        )}
      </main>
    </>
  );
}

function countMonacoStylesheets() {
  return document.querySelectorAll('link[rel="stylesheet"][href*="/vs/editor/editor.main.css"]').length;
}
