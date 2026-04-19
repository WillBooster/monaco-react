'use client';

import { Suspense, useState, useRef, useCallback, useEffect } from 'react';
import type { ReactElement } from 'react';

import MonacoContainer from '../MonacoContainer';
import useMount from '../hooks/useMount';
import useUpdate from '../hooks/useUpdate';
import useMonaco from '../hooks/useMonaco';
import { noop, getOrCreateModel } from '../utils';
import type { DiffEditorProps, MonacoDiffEditor } from './types';
import type { Monaco } from '..';

function DiffEditor(props: DiffEditorProps): ReactElement {
  const { width = '100%', height = '100%', loading = 'Loading...', className, wrapperProps = {} } = props;

  return (
    <Suspense
      fallback={
        <MonacoContainer
          width={width}
          height={height}
          isEditorReady={false}
          loading={loading}
          className={className}
          wrapperProps={wrapperProps}
        />
      }
    >
      <DiffEditorContent {...props} />
    </Suspense>
  );
}

function DiffEditorContent(props: DiffEditorProps): ReactElement {
  const monaco = useMonaco();

  if (!monaco) {
    const { width = '100%', height = '100%', loading = 'Loading...', className, wrapperProps = {} } = props;

    return (
      <MonacoContainer
        width={width}
        height={height}
        isEditorReady={false}
        loading={loading}
        className={className}
        wrapperProps={wrapperProps}
      />
    );
  }

  return <MountedDiffEditor {...props} monaco={monaco} />;
}

function MountedDiffEditor({
  monaco,
  original,
  modified,
  language,
  originalLanguage,
  modifiedLanguage,
  originalModelPath,
  modifiedModelPath,
  keepCurrentOriginalModel = false,
  keepCurrentModifiedModel = false,
  theme = 'light',
  loading = 'Loading...',
  options = {},
  height = '100%',
  width = '100%',
  className,
  wrapperProps = {},
  beforeMount = noop,
  onMount = noop,
}: DiffEditorProps & { monaco: Monaco }): ReactElement {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef<MonacoDiffEditor | null>(null);
  const monacoRef = useRef<Monaco>(monaco);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onMountRef = useRef(onMount);
  const beforeMountRef = useRef(beforeMount);
  const preventCreation = useRef(false);

  monacoRef.current = monaco;

  useMount(() => {
    return () => {
      if (editorRef.current) {
        disposeEditor();
      }
    };
  });

  useUpdate(
    () => {
      if (editorRef.current && monacoRef.current) {
        const originalEditor = editorRef.current.getOriginalEditor();
        const model = getOrCreateModel(
          monacoRef.current,
          original || '',
          originalLanguage || language || 'text',
          originalModelPath || ''
        );

        if (model !== originalEditor.getModel()) {
          originalEditor.setModel(model);
        }
      }
    },
    [originalModelPath],
    isEditorReady
  );

  useUpdate(
    () => {
      if (editorRef.current && monacoRef.current) {
        const modifiedEditor = editorRef.current.getModifiedEditor();
        const model = getOrCreateModel(
          monacoRef.current,
          modified || '',
          modifiedLanguage || language || 'text',
          modifiedModelPath || ''
        );

        if (model !== modifiedEditor.getModel()) {
          modifiedEditor.setModel(model);
        }
      }
    },
    [modifiedModelPath],
    isEditorReady
  );

  useUpdate(
    () => {
      const modifiedEditor = editorRef.current!.getModifiedEditor();
      if (modifiedEditor.getOption(monacoRef.current!.editor.EditorOption.readOnly)) {
        modifiedEditor.setValue(modified || '');
      } else {
        if (modified !== modifiedEditor.getValue()) {
          modifiedEditor.executeEdits('', [
            {
              range: modifiedEditor.getModel()!.getFullModelRange(),
              text: modified || '',
              forceMoveMarkers: true,
            },
          ]);

          modifiedEditor.pushUndoStop();
        }
      }
    },
    [modified],
    isEditorReady
  );

  useUpdate(
    () => {
      editorRef.current?.getModel()?.original.setValue(original || '');
    },
    [original],
    isEditorReady
  );

  useUpdate(
    () => {
      const { original, modified } = editorRef.current!.getModel()!;

      monacoRef.current!.editor.setModelLanguage(original, originalLanguage || language || 'text');
      monacoRef.current!.editor.setModelLanguage(modified, modifiedLanguage || language || 'text');
    },
    [language, originalLanguage, modifiedLanguage],
    isEditorReady
  );

  useUpdate(
    () => {
      monacoRef.current?.editor.setTheme(theme);
    },
    [theme],
    isEditorReady
  );

  useUpdate(
    () => {
      editorRef.current?.updateOptions(options);
    },
    [options],
    isEditorReady
  );

  const setModels = useCallback(() => {
    beforeMountRef.current(monacoRef.current);
    const originalModel = getOrCreateModel(
      monacoRef.current,
      original || '',
      originalLanguage || language || 'text',
      originalModelPath || ''
    );

    const modifiedModel = getOrCreateModel(
      monacoRef.current,
      modified || '',
      modifiedLanguage || language || 'text',
      modifiedModelPath || ''
    );

    editorRef.current?.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  }, [language, modified, modifiedLanguage, original, originalLanguage, originalModelPath, modifiedModelPath]);

  const createEditor = useCallback(() => {
    if (!preventCreation.current && containerRef.current) {
      editorRef.current = monacoRef.current!.editor.createDiffEditor(containerRef.current, {
        automaticLayout: true,
        ...options,
      });

      setModels();

      monacoRef.current?.editor.setTheme(theme);

      setIsEditorReady(true);
      preventCreation.current = true;
    }
  }, [options, theme, setModels]);

  useEffect(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current!, monacoRef.current!);
    }
  }, [isEditorReady]);

  useEffect(() => {
    if (!isEditorReady) {
      createEditor();
    }
  }, [isEditorReady, createEditor]);

  function disposeEditor(): void {
    const editor = editorRef.current;
    const models = editor?.getModel();

    // oxlint-disable-next-line unicorn/no-null -- Monaco detaches diff models with null.
    editor?.setModel(null);
    editor?.dispose();

    if (!keepCurrentOriginalModel && !models?.original.isDisposed()) {
      models?.original?.dispose();
    }

    if (!keepCurrentModifiedModel && !models?.modified.isDisposed()) {
      models?.modified?.dispose();
    }

    // oxlint-disable-next-line unicorn/no-null -- React refs use null after unmount.
    editorRef.current = null;
    preventCreation.current = false;
    setIsEditorReady(false);
  }

  return (
    <MonacoContainer
      width={width}
      height={height}
      isEditorReady={isEditorReady}
      loading={loading}
      _ref={containerRef}
      className={className}
      wrapperProps={wrapperProps}
    />
  );
}

export default DiffEditor;
