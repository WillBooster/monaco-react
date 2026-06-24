import { useState } from 'react';

import MonacoEditor from '@willbooster/monaco-react';

export default function SharedModelDisposalPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [readyCount, setReadyCount] = useState(0);

  function hideEditors() {
    setIsVisible(false);
  }

  return (
    <main>
      <button type="button" onClick={hideEditors}>
        Hide shared editors
      </button>
      <p data-testid="shared-editor-status">{isVisible ? `ready-${readyCount}` : 'shared-editors-hidden'}</p>
      {isVisible && (
        <>
          <MonacoEditor
            height={120}
            path="shared-model.ts"
            defaultValue="const first = 1;"
            defaultLanguage="typescript"
            onMount={() => setReadyCount((currentCount) => currentCount + 1)}
          />
          <MonacoEditor
            height={120}
            path="shared-model.ts"
            defaultValue="const second = 2;"
            defaultLanguage="typescript"
            onMount={() => setReadyCount((currentCount) => currentCount + 1)}
          />
        </>
      )}
    </main>
  );
}
