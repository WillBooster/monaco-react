import { useRef, useState } from 'react';

import MonacoEditor, { DiffEditor } from '@willbooster/monaco-react';

export default function SharedModelDisposalPage() {
  const secondEditorRef = useRef<{ getModel(): { isDisposed(): boolean } | null } | undefined>(undefined);
  const diffSharedEditorRef = useRef<{ getModel(): { isDisposed(): boolean } | null } | undefined>(undefined);
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isSecondVisible, setIsSecondVisible] = useState(true);
  const [isDiffEditorVisible, setIsDiffEditorVisible] = useState(true);
  const [isDiffSharedEditorVisible, setIsDiffSharedEditorVisible] = useState(true);
  const [readyCount, setReadyCount] = useState(0);
  const [secondModelStatus, setSecondModelStatus] = useState('second-model-unchecked');
  const [diffSharedModelStatus, setDiffSharedModelStatus] = useState('diff-shared-model-unchecked');

  function hideFirstEditor() {
    setIsFirstVisible(false);
  }

  function hideAllEditors() {
    setIsFirstVisible(false);
    setIsSecondVisible(false);
    setIsDiffEditorVisible(false);
    setIsDiffSharedEditorVisible(false);
  }

  function checkSecondModel() {
    const model = secondEditorRef.current?.getModel();
    setSecondModelStatus(model?.isDisposed() ? 'second-model-disposed' : 'second-model-live');
  }

  function hideDiffEditor() {
    setIsDiffEditorVisible(false);
  }

  function checkDiffSharedModel() {
    const model = diffSharedEditorRef.current?.getModel();
    setDiffSharedModelStatus(model?.isDisposed() ? 'diff-shared-model-disposed' : 'diff-shared-model-live');
  }

  return (
    <main>
      <button type="button" onClick={hideFirstEditor}>
        Hide first shared editor
      </button>
      <button type="button" onClick={checkSecondModel}>
        Check second model
      </button>
      <button type="button" onClick={hideAllEditors}>
        Hide shared editors
      </button>
      <button type="button" onClick={hideDiffEditor}>
        Hide shared diff editor
      </button>
      <button type="button" onClick={checkDiffSharedModel}>
        Check diff shared model
      </button>
      <p data-testid="shared-editor-status">
        {isFirstVisible || isSecondVisible || isDiffEditorVisible || isDiffSharedEditorVisible
          ? `ready-${readyCount}`
          : 'shared-editors-hidden'}
      </p>
      <p data-testid="second-model-status">{secondModelStatus}</p>
      <p data-testid="diff-shared-model-status">{diffSharedModelStatus}</p>
      {isFirstVisible && (
        <MonacoEditor
          height={120}
          path="shared-model.ts"
          defaultValue="const first = 1;"
          defaultLanguage="typescript"
          onMount={() => setReadyCount((currentCount) => currentCount + 1)}
        />
      )}
      {isSecondVisible && (
        <MonacoEditor
          height={120}
          path="shared-model.ts"
          defaultValue="const second = 2;"
          defaultLanguage="typescript"
          onMount={(editor) => {
            secondEditorRef.current = editor;
            setReadyCount((currentCount) => currentCount + 1);
          }}
        />
      )}
      {isDiffSharedEditorVisible && (
        <MonacoEditor
          height={120}
          path="shared-diff-original.ts"
          defaultValue="const shared = 1;"
          defaultLanguage="typescript"
          onMount={(editor) => {
            diffSharedEditorRef.current = editor;
            setReadyCount((currentCount) => currentCount + 1);
          }}
        />
      )}
      {isDiffEditorVisible && (
        <DiffEditor
          height={120}
          original="const shared = 1;"
          modified="const shared = 2;"
          language="typescript"
          originalModelPath="shared-diff-original.ts"
          modifiedModelPath="shared-diff-modified.ts"
          onMount={() => setReadyCount((currentCount) => currentCount + 1)}
        />
      )}
    </main>
  );
}
