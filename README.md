# @willbooster/monaco-react

[![Test](https://github.com/WillBooster/monaco-react/actions/workflows/test.yml/badge.svg)](https://github.com/WillBooster/monaco-react/actions/workflows/test.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![monthly downloads](https://img.shields.io/npm/dm/@willbooster/monaco-react)](https://www.npmjs.com/package/@willbooster/monaco-react)
[![npm version](https://img.shields.io/npm/v/@willbooster/monaco-react.svg?style=flat)](https://www.npmjs.com/package/@willbooster/monaco-react)

React components for [Monaco Editor](https://microsoft.github.io/monaco-editor/), powered by [`@willbooster/monaco-loader`](https://github.com/WillBooster/monaco-loader).

This package is a maintained fork of [`suren-atoyan/monaco-react`](https://github.com/suren-atoyan/monaco-react) published as `@willbooster/monaco-react`.

## Installation

```bash
yarn add @willbooster/monaco-react
```

`react` and `react-dom` are peer dependencies. `monaco-editor` is a direct dependency for Monaco type resolution. This package supports React 19.x, Node.js 24 or newer, and is tested with Next.js 16.

## Usage

```tsx
'use client';

import Editor from '@willbooster/monaco-react';

export default function Page() {
  return <Editor height="90vh" defaultLanguage="typescript" defaultValue="const answer = 42;" />;
}
```

`Editor`, `DiffEditor`, and `useMonaco` use React client-side hooks. In Next.js App Router projects, import and render them from a Client Component.

## API

```tsx
import Editor, { DiffEditor, loader, useMonaco } from '@willbooster/monaco-react';
```

- `Editor`: Monaco standalone code editor component.
- `DiffEditor`: Monaco standalone diff editor component.
- `useMonaco`: React hook returning the initialized Monaco instance after hydration. Wrap components that call it in `Suspense`.
- `loader`: the `@willbooster/monaco-loader` instance used by the components.

### Editor

```tsx
<Editor
  height="90vh"
  defaultLanguage="javascript"
  defaultValue="// hello"
  onMount={(editor, monaco) => {
    editor.focus();
    monaco.editor.setTheme('vs-dark');
  }}
  onChange={(value) => {
    console.log(value);
  }}
/>
```

### DiffEditor

```tsx
<DiffEditor height="90vh" language="typescript" original="const value = 1;" modified="const value = 2;" />
```

### Loader Configuration

By default Monaco is loaded from the CDN configured by `@willbooster/monaco-loader`. You can provide your own Monaco instance or loader paths before rendering an editor.

```tsx
import * as monaco from 'monaco-editor';
import { loader } from '@willbooster/monaco-react';

loader.config({ monaco });
```

## Development

```bash
yarn install
yarn check-for-ai
yarn test
```

`yarn test` runs unit tests, builds the library, builds the Next.js e2e app, and runs Playwright against it.
