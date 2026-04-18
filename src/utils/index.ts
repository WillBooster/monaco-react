import type { Monaco } from '..';
import type { Uri, editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

/**
 * noop is a helper function that does nothing
 * @returns undefined
 */
function noop(): void {
  /** no-op */
}

/**
 * getOrCreateModel is a helper function that will return a model if it exists
 * or create a new model if it does not exist.
 * This is useful for when you want to create a model for a file that may or may not exist yet.
 * @param monaco The monaco instance
 * @param value The value of the model
 * @param language The language of the model
 * @param path The path of the model
 * @returns The model that was found or created
 */
function getOrCreateModel(monaco: Monaco, value: string, language: string, path: string): editor.ITextModel {
  return getModel(monaco, path) ?? createModel(monaco, value, language, path);
}

/**
 * getModel is a helper function that will return a model if it exists
 * or return undefined if it does not exist.
 * @param monaco The monaco instance
 * @param path The path of the model
 * @returns The model that was found or undefined
 */
function getModel(monaco: Monaco, path: string): editor.ITextModel | null {
  return monaco.editor.getModel(createModelUri(monaco, path));
}

/**
 * createModel is a helper function that will create a new model
 * @param monaco The monaco instance
 * @param value The value of the model
 * @param language The language of the model
 * @param path The path of the model
 * @returns The model that was created
 */
function createModel(monaco: Monaco, value: string, language?: string, path?: string): editor.ITextModel {
  return monaco.editor.createModel(value, language, path ? createModelUri(monaco, path) : undefined);
}

/**
 * createModelUri is a helper function that will create a new model uri
 * @param monaco The monaco instance
 * @param path The path of the model
 * @returns The model uri that was created
 */
function createModelUri(monaco: Monaco, path: string): Uri {
  return monaco.Uri.parse(path);
}

export { noop, getOrCreateModel };
