import { useRef, useState } from 'react';

import MonacoEditor from '@willbooster/monaco-react';

export default function SharedModelDisposalPage() {
  const secondEditorRef = useRef<{ getModel(): { isDisposed(): boolean } | null } | undefined>(undefined);
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isSecondVisible, setIsSecondVisible] = useState(true);
  const [readyCount, setReadyCount] = useState(0);
  const [secondModelStatus, setSecondModelStatus] = useState('second-model-unchecked');

  function hideFirstEditor() {
    setIsFirstVisible(false);
  }

  function hideAllEditors() {
    setIsFirstVisible(false);
    setIsSecondVisible(false);
  }

  function checkSecondModel() {
    const model = secondEditorRef.current?.getModel();
    setSecondModelStatus(model?.isDisposed() ? 'second-model-disposed' : 'second-model-live');
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
      <p data-testid="shared-editor-status">
        {isFirstVisible || isSecondVisible ? `ready-${readyCount}` : 'shared-editors-hidden'}
      </p>
      <p data-testid="second-model-status">{secondModelStatus}</p>
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
    </main>
  );
}
