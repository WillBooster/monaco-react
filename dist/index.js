'use client';

// src/index.ts
import loader4 from "@willbooster/monaco-loader";
import { shikiToMonaco } from "@shikijs/monaco";

// src/DiffEditor/index.ts
import { memo as memo2 } from "react";

// src/DiffEditor/DiffEditor.tsx
import { useState, useRef as useRef2, useCallback, useEffect as useEffect3 } from "react";
import loader from "@willbooster/monaco-loader";

// src/MonacoContainer/index.ts
import { memo } from "react";

// src/MonacoContainer/styles.ts
var styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    textAlign: "initial"
  },
  fullWidth: {
    width: "100%"
  },
  hide: {
    display: "none"
  }
};
var styles_default = styles;

// src/Loading/styles.ts
var styles2 = {
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
};
var styles_default2 = styles2;

// src/Loading/Loading.tsx
import { jsx } from "react/jsx-runtime";
function Loading({ children }) {
  return /* @__PURE__ */ jsx("div", { style: styles_default2.container, children });
}
var Loading_default = Loading;

// src/Loading/index.ts
var Loading_default2 = Loading_default;

// src/MonacoContainer/MonacoContainer.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function MonacoContainer({
  width,
  height,
  isEditorReady,
  loading,
  _ref,
  className,
  wrapperProps
}) {
  return /* @__PURE__ */ jsxs("section", { style: { ...styles_default.wrapper, width, height }, ...wrapperProps, children: [
    !isEditorReady && /* @__PURE__ */ jsx2(Loading_default2, { children: loading }),
    /* @__PURE__ */ jsx2("div", { ref: _ref, style: { ...styles_default.fullWidth, ...!isEditorReady && styles_default.hide }, className })
  ] });
}
var MonacoContainer_default = MonacoContainer;

// src/MonacoContainer/index.ts
var MonacoContainer_default2 = memo(MonacoContainer_default);

// src/hooks/useMount/index.ts
import { useEffect } from "react";
function useMount(effect) {
  useEffect(effect, []);
}
var useMount_default = useMount;

// src/hooks/useUpdate/index.ts
import { useEffect as useEffect2, useRef } from "react";
function useUpdate(effect, deps, applyChanges = true) {
  const isInitialMount = useRef(true);
  useEffect2(
    isInitialMount.current || !applyChanges ? () => {
      isInitialMount.current = false;
    } : effect,
    deps
  );
}
var useUpdate_default = useUpdate;

// src/utils/index.ts
function noop() {
}
function getOrCreateModel(monaco, value, language, path) {
  return getModel(monaco, path) ?? createModel(monaco, value, language, path);
}
function getModel(monaco, path) {
  return monaco.editor.getModel(createModelUri(monaco, path));
}
function createModel(monaco, value, language, path) {
  return monaco.editor.createModel(value, language, path ? createModelUri(monaco, path) : void 0);
}
function createModelUri(monaco, path) {
  return monaco.Uri.parse(path);
}

// src/DiffEditor/DiffEditor.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function DiffEditor({
  original,
  modified,
  language,
  originalLanguage,
  modifiedLanguage,
  originalModelPath,
  modifiedModelPath,
  keepCurrentOriginalModel = false,
  keepCurrentModifiedModel = false,
  theme = "light",
  loading = "Loading...",
  options = {},
  height = "100%",
  width = "100%",
  className,
  wrapperProps = {},
  beforeMount = noop,
  onMount = noop
}) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isMonacoMounting, setIsMonacoMounting] = useState(true);
  const editorRef = useRef2(null);
  const monacoRef = useRef2(null);
  const containerRef = useRef2(null);
  const onMountRef = useRef2(onMount);
  const beforeMountRef = useRef2(beforeMount);
  const preventCreation = useRef2(false);
  useMount_default(() => {
    const cancelable = loader.init();
    cancelable.then((monaco) => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch((error) => error?.type !== "cancelation" && console.error("Monaco initialization: error:", error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  useUpdate_default(
    () => {
      if (editorRef.current && monacoRef.current) {
        const originalEditor = editorRef.current.getOriginalEditor();
        const model = getOrCreateModel(
          monacoRef.current,
          original || "",
          originalLanguage || language || "text",
          originalModelPath || ""
        );
        if (model !== originalEditor.getModel()) {
          originalEditor.setModel(model);
        }
      }
    },
    [originalModelPath],
    isEditorReady
  );
  useUpdate_default(
    () => {
      if (editorRef.current && monacoRef.current) {
        const modifiedEditor = editorRef.current.getModifiedEditor();
        const model = getOrCreateModel(
          monacoRef.current,
          modified || "",
          modifiedLanguage || language || "text",
          modifiedModelPath || ""
        );
        if (model !== modifiedEditor.getModel()) {
          modifiedEditor.setModel(model);
        }
      }
    },
    [modifiedModelPath],
    isEditorReady
  );
  useUpdate_default(
    () => {
      const modifiedEditor = editorRef.current.getModifiedEditor();
      if (modifiedEditor.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
        modifiedEditor.setValue(modified || "");
      } else {
        if (modified !== modifiedEditor.getValue()) {
          modifiedEditor.executeEdits("", [
            {
              range: modifiedEditor.getModel().getFullModelRange(),
              text: modified || "",
              forceMoveMarkers: true
            }
          ]);
          modifiedEditor.pushUndoStop();
        }
      }
    },
    [modified],
    isEditorReady
  );
  useUpdate_default(
    () => {
      editorRef.current?.getModel()?.original.setValue(original || "");
    },
    [original],
    isEditorReady
  );
  useUpdate_default(
    () => {
      const { original: original2, modified: modified2 } = editorRef.current.getModel();
      monacoRef.current.editor.setModelLanguage(original2, originalLanguage || language || "text");
      monacoRef.current.editor.setModelLanguage(modified2, modifiedLanguage || language || "text");
    },
    [language, originalLanguage, modifiedLanguage],
    isEditorReady
  );
  useUpdate_default(
    () => {
      monacoRef.current?.editor.setTheme(theme);
    },
    [theme],
    isEditorReady
  );
  useUpdate_default(
    () => {
      editorRef.current?.updateOptions(options);
    },
    [options],
    isEditorReady
  );
  const setModels = useCallback(() => {
    if (!monacoRef.current) return;
    beforeMountRef.current(monacoRef.current);
    const originalModel = getOrCreateModel(
      monacoRef.current,
      original || "",
      originalLanguage || language || "text",
      originalModelPath || ""
    );
    const modifiedModel = getOrCreateModel(
      monacoRef.current,
      modified || "",
      modifiedLanguage || language || "text",
      modifiedModelPath || ""
    );
    editorRef.current?.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }, [language, modified, modifiedLanguage, original, originalLanguage, originalModelPath, modifiedModelPath]);
  const createEditor = useCallback(() => {
    if (!preventCreation.current && containerRef.current) {
      editorRef.current = monacoRef.current.editor.createDiffEditor(containerRef.current, {
        automaticLayout: true,
        ...options
      });
      setModels();
      monacoRef.current?.editor.setTheme(theme);
      setIsEditorReady(true);
      preventCreation.current = true;
    }
  }, [options, theme, setModels]);
  useEffect3(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  useEffect3(() => {
    if (!isMonacoMounting && !isEditorReady) {
      createEditor();
    }
  }, [isMonacoMounting, isEditorReady, createEditor]);
  function disposeEditor() {
    const editor = editorRef.current;
    const models = editor?.getModel();
    editor?.setModel(null);
    editor?.dispose();
    if (!keepCurrentOriginalModel && !models?.original.isDisposed()) {
      models?.original?.dispose();
    }
    if (!keepCurrentModifiedModel && !models?.modified.isDisposed()) {
      models?.modified?.dispose();
    }
    editorRef.current = null;
    preventCreation.current = false;
    setIsEditorReady(false);
  }
  return /* @__PURE__ */ jsx3(
    MonacoContainer_default2,
    {
      width,
      height,
      isEditorReady,
      loading,
      _ref: containerRef,
      className,
      wrapperProps
    }
  );
}
var DiffEditor_default = DiffEditor;

// src/DiffEditor/index.ts
var DiffEditor_default2 = memo2(DiffEditor_default);

// src/hooks/useMonaco/index.ts
import { useState as useState2 } from "react";
import loader2 from "@willbooster/monaco-loader";
function useMonaco() {
  const [monaco, setMonaco] = useState2(loader2.__getMonacoInstance());
  useMount_default(() => {
    let cancelable;
    if (!monaco) {
      cancelable = loader2.init();
      void cancelable.then((monaco2) => {
        setMonaco(monaco2);
        return;
      }).catch((error) => {
        if (error?.type !== "cancelation") {
          console.error("Monaco initialization: error:", error);
        }
      });
    }
    return () => cancelable?.cancel();
  });
  return monaco;
}
var useMonaco_default = useMonaco;

// src/Editor/index.ts
import { memo as memo3 } from "react";

// src/Editor/Editor.tsx
import { useState as useState3, useEffect as useEffect5, useRef as useRef4, useCallback as useCallback2 } from "react";
import loader3 from "@willbooster/monaco-loader";

// src/hooks/usePrevious/index.ts
import { useEffect as useEffect4, useRef as useRef3 } from "react";
function usePrevious(value) {
  const ref = useRef3(void 0);
  useEffect4(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var usePrevious_default = usePrevious;

// src/Editor/Editor.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var viewStates = /* @__PURE__ */ new Map();
function Editor({
  defaultValue,
  defaultLanguage,
  defaultPath,
  value,
  language,
  path,
  /* === */
  theme = "light",
  line,
  loading = "Loading...",
  options = {},
  overrideServices = {},
  saveViewState = true,
  keepCurrentModel = false,
  /* === */
  width = "100%",
  height = "100%",
  className,
  wrapperProps = {},
  /* === */
  beforeMount = noop,
  onMount = noop,
  onChange,
  onValidate = noop
}) {
  const [isEditorReady, setIsEditorReady] = useState3(false);
  const [isMonacoMounting, setIsMonacoMounting] = useState3(true);
  const monacoRef = useRef4(null);
  const editorRef = useRef4(null);
  const containerRef = useRef4(null);
  const onMountRef = useRef4(onMount);
  const beforeMountRef = useRef4(beforeMount);
  const subscriptionRef = useRef4(void 0);
  const valueRef = useRef4(value);
  const previousPath = usePrevious_default(path);
  const preventCreation = useRef4(false);
  const preventTriggerChangeEvent = useRef4(false);
  useMount_default(() => {
    const cancelable = loader3.init();
    cancelable.then((monaco) => (monacoRef.current = monaco) && setIsMonacoMounting(false)).catch((error) => error?.type !== "cancelation" && console.error("Monaco initialization: error:", error));
    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });
  useUpdate_default(
    () => {
      const model = getOrCreateModel(
        monacoRef.current,
        defaultValue || value || "",
        defaultLanguage || language || "",
        path || defaultPath || ""
      );
      if (model !== editorRef.current?.getModel()) {
        if (saveViewState) viewStates.set(previousPath, editorRef.current?.saveViewState());
        editorRef.current?.setModel(model);
        if (saveViewState) editorRef.current?.restoreViewState(viewStates.get(path));
      }
    },
    [path],
    isEditorReady
  );
  useUpdate_default(
    () => {
      editorRef.current?.updateOptions(options);
    },
    [options],
    isEditorReady
  );
  useUpdate_default(
    () => {
      if (!editorRef.current || value === void 0) return;
      if (editorRef.current.getOption(monacoRef.current.editor.EditorOption.readOnly)) {
        editorRef.current.setValue(value);
      } else if (value !== editorRef.current.getValue()) {
        preventTriggerChangeEvent.current = true;
        editorRef.current.executeEdits("", [
          {
            range: editorRef.current.getModel().getFullModelRange(),
            text: value,
            forceMoveMarkers: true
          }
        ]);
        editorRef.current.pushUndoStop();
        preventTriggerChangeEvent.current = false;
      }
    },
    [value],
    isEditorReady
  );
  useUpdate_default(
    () => {
      const model = editorRef.current?.getModel();
      if (isEditorReady && model && language) {
        monacoRef.current?.editor.setModelLanguage(model, language);
      }
    },
    [language, isEditorReady],
    isEditorReady
  );
  useUpdate_default(
    () => {
      if (line !== void 0) {
        editorRef.current?.revealLine(line);
      }
    },
    [line],
    isEditorReady
  );
  useUpdate_default(
    () => {
      monacoRef.current?.editor.setTheme(theme);
    },
    [theme],
    isEditorReady
  );
  const createEditor = useCallback2(() => {
    if (!containerRef.current || !monacoRef.current) return;
    if (!preventCreation.current) {
      beforeMountRef.current(monacoRef.current);
      const autoCreatedModelPath = path || defaultPath;
      const defaultModel = getOrCreateModel(
        monacoRef.current,
        value || defaultValue || "",
        defaultLanguage || language || "",
        autoCreatedModelPath || ""
      );
      const editor = monacoRef.current.editor.create(
        containerRef.current,
        {
          model: defaultModel,
          automaticLayout: true,
          ...options
        },
        overrideServices
      );
      editorRef.current = editor;
      saveViewState && editor.restoreViewState(viewStates.get(autoCreatedModelPath));
      monacoRef.current.editor.setTheme(theme);
      if (line !== void 0) {
        editor.revealLine(line);
      }
      setIsEditorReady(true);
      preventCreation.current = true;
    }
  }, [
    defaultValue,
    defaultLanguage,
    defaultPath,
    value,
    language,
    path,
    options,
    overrideServices,
    saveViewState,
    theme,
    line
  ]);
  useEffect5(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  useEffect5(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);
  valueRef.current = value;
  useEffect5(() => {
    if (isEditorReady && onChange) {
      subscriptionRef.current?.dispose();
      subscriptionRef.current = editorRef.current?.onDidChangeModelContent((event) => {
        if (!preventTriggerChangeEvent.current) {
          onChange(editorRef.current.getValue(), event);
        }
      });
    }
  }, [isEditorReady, onChange]);
  useEffect5(() => {
    if (isEditorReady) {
      const changeMarkersListener = monacoRef.current.editor.onDidChangeMarkers((uris) => {
        const editorUri = editorRef.current.getModel()?.uri;
        if (editorUri) {
          const currentEditorHasMarkerChanges = uris.find((uri) => uri.path === editorUri.path);
          if (currentEditorHasMarkerChanges) {
            const markers = monacoRef.current.editor.getModelMarkers({
              resource: editorUri
            });
            onValidate?.(markers);
          }
        }
      });
      return () => {
        changeMarkersListener?.dispose();
      };
    }
    return () => {
    };
  }, [isEditorReady, onValidate]);
  function disposeEditor() {
    subscriptionRef.current?.dispose();
    if (keepCurrentModel) {
      saveViewState && viewStates.set(path, editorRef.current.saveViewState());
    } else {
      editorRef.current.getModel()?.dispose();
    }
    editorRef.current.dispose();
    editorRef.current = null;
    preventCreation.current = false;
    setIsEditorReady(false);
  }
  return /* @__PURE__ */ jsx4(
    MonacoContainer_default2,
    {
      width,
      height,
      isEditorReady,
      loading,
      _ref: containerRef,
      className,
      wrapperProps
    }
  );
}
var Editor_default = Editor;

// src/Editor/index.ts
var Editor_default2 = memo3(Editor_default);

// src/index.ts
var index_default = Editor_default2;
export {
  DiffEditor_default2 as DiffEditor,
  Editor_default2 as Editor,
  index_default as default,
  loader4 as loader,
  shikiToMonaco,
  useMonaco_default as useMonaco
};
//# sourceMappingURL=index.js.map