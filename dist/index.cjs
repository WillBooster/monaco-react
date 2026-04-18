'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DiffEditor: () => DiffEditor_default2,
  Editor: () => Editor_default2,
  default: () => index_default,
  loader: () => import_monaco_loader4.default,
  shikiToMonaco: () => import_monaco.shikiToMonaco,
  useMonaco: () => useMonaco_default
});
module.exports = __toCommonJS(index_exports);
var import_monaco_loader4 = __toESM(require("@willbooster/monaco-loader"), 1);
var import_monaco = require("@shikijs/monaco");

// src/DiffEditor/index.ts
var import_react5 = require("react");

// src/DiffEditor/DiffEditor.tsx
var import_react4 = require("react");
var import_monaco_loader = __toESM(require("@willbooster/monaco-loader"), 1);

// src/MonacoContainer/index.ts
var import_react = require("react");

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
var import_jsx_runtime = require("react/jsx-runtime");
function Loading({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles_default2.container, children });
}
var Loading_default = Loading;

// src/Loading/index.ts
var Loading_default2 = Loading_default;

// src/MonacoContainer/MonacoContainer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function MonacoContainer({
  width,
  height,
  isEditorReady,
  loading,
  _ref,
  className,
  wrapperProps
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { style: { ...styles_default.wrapper, width, height }, ...wrapperProps, children: [
    !isEditorReady && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Loading_default2, { children: loading }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: _ref, style: { ...styles_default.fullWidth, ...!isEditorReady && styles_default.hide }, className })
  ] });
}
var MonacoContainer_default = MonacoContainer;

// src/MonacoContainer/index.ts
var MonacoContainer_default2 = (0, import_react.memo)(MonacoContainer_default);

// src/hooks/useMount/index.ts
var import_react2 = require("react");
function useMount(effect) {
  (0, import_react2.useEffect)(effect, []);
}
var useMount_default = useMount;

// src/hooks/useUpdate/index.ts
var import_react3 = require("react");
function useUpdate(effect, deps, applyChanges = true) {
  const isInitialMount = (0, import_react3.useRef)(true);
  (0, import_react3.useEffect)(
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  const [isEditorReady, setIsEditorReady] = (0, import_react4.useState)(false);
  const [isMonacoMounting, setIsMonacoMounting] = (0, import_react4.useState)(true);
  const editorRef = (0, import_react4.useRef)(null);
  const monacoRef = (0, import_react4.useRef)(null);
  const containerRef = (0, import_react4.useRef)(null);
  const onMountRef = (0, import_react4.useRef)(onMount);
  const beforeMountRef = (0, import_react4.useRef)(beforeMount);
  const preventCreation = (0, import_react4.useRef)(false);
  useMount_default(() => {
    const cancelable = import_monaco_loader.default.init();
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
  const setModels = (0, import_react4.useCallback)(() => {
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
  const createEditor = (0, import_react4.useCallback)(() => {
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
  (0, import_react4.useEffect)(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  (0, import_react4.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var DiffEditor_default2 = (0, import_react5.memo)(DiffEditor_default);

// src/hooks/useMonaco/index.ts
var import_react6 = require("react");
var import_monaco_loader2 = __toESM(require("@willbooster/monaco-loader"), 1);
function useMonaco() {
  const [monaco, setMonaco] = (0, import_react6.useState)(import_monaco_loader2.default.__getMonacoInstance());
  useMount_default(() => {
    let cancelable;
    if (!monaco) {
      cancelable = import_monaco_loader2.default.init();
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
var import_react9 = require("react");

// src/Editor/Editor.tsx
var import_react8 = require("react");
var import_monaco_loader3 = __toESM(require("@willbooster/monaco-loader"), 1);

// src/hooks/usePrevious/index.ts
var import_react7 = require("react");
function usePrevious(value) {
  const ref = (0, import_react7.useRef)(void 0);
  (0, import_react7.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var usePrevious_default = usePrevious;

// src/Editor/Editor.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  const [isEditorReady, setIsEditorReady] = (0, import_react8.useState)(false);
  const [isMonacoMounting, setIsMonacoMounting] = (0, import_react8.useState)(true);
  const monacoRef = (0, import_react8.useRef)(null);
  const editorRef = (0, import_react8.useRef)(null);
  const containerRef = (0, import_react8.useRef)(null);
  const onMountRef = (0, import_react8.useRef)(onMount);
  const beforeMountRef = (0, import_react8.useRef)(beforeMount);
  const subscriptionRef = (0, import_react8.useRef)(void 0);
  const valueRef = (0, import_react8.useRef)(value);
  const previousPath = usePrevious_default(path);
  const preventCreation = (0, import_react8.useRef)(false);
  const preventTriggerChangeEvent = (0, import_react8.useRef)(false);
  useMount_default(() => {
    const cancelable = import_monaco_loader3.default.init();
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
  const createEditor = (0, import_react8.useCallback)(() => {
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
  (0, import_react8.useEffect)(() => {
    if (isEditorReady) {
      onMountRef.current(editorRef.current, monacoRef.current);
    }
  }, [isEditorReady]);
  (0, import_react8.useEffect)(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);
  valueRef.current = value;
  (0, import_react8.useEffect)(() => {
    if (isEditorReady && onChange) {
      subscriptionRef.current?.dispose();
      subscriptionRef.current = editorRef.current?.onDidChangeModelContent((event) => {
        if (!preventTriggerChangeEvent.current) {
          onChange(editorRef.current.getValue(), event);
        }
      });
    }
  }, [isEditorReady, onChange]);
  (0, import_react8.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var Editor_default2 = (0, import_react9.memo)(Editor_default);

// src/index.ts
var index_default = Editor_default2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiffEditor,
  Editor,
  loader,
  shikiToMonaco,
  useMonaco
});
//# sourceMappingURL=index.cjs.map