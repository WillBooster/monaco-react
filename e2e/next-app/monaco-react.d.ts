declare module '@willbooster/monaco-react' {
  import type { ComponentType, ReactNode } from 'react';

  export interface Monaco {
    editor: {
      create: (...args: unknown[]) => unknown;
      createDiffEditor: (...args: unknown[]) => unknown;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }

  export interface CancelablePromise<T> extends Promise<T> {
    cancel: () => void;
  }

  export const loader: {
    config: (globalConfig: { monaco?: Monaco; [key: string]: unknown }) => void;
    init: () => CancelablePromise<Monaco>;
    __getMonacoInstance: () => Monaco | undefined;
  };

  export function useMonaco(): Monaco | undefined;

  export interface EditorProps {
    defaultLanguage?: string;
    defaultValue?: string;
    height?: number | string;
    onMount?: (editor: unknown, monaco: Monaco) => void;
  }

  export interface DiffEditorProps {
    height?: number | string;
    language?: string;
    modified?: string;
    onMount?: (editor: unknown, monaco: Monaco) => void;
    original?: string;
  }

  export const DiffEditor: ComponentType<DiffEditorProps>;

  const Editor: ComponentType<EditorProps>;
  export default Editor;
}
