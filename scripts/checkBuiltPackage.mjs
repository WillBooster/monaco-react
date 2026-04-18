import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJsonPath = path.join(packageRoot, 'package.json');
const fixtureEntry = path.join(packageRoot, 'e2e/next-app/next.e2e.ts');
const requireFromFixture = createRequire(fixtureEntry);

const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
const rootExport = packageJson.exports['.'];

assert.deepEqual(rootExport, {
  import: './dist/index.js',
  require: './dist/index.cjs',
  types: './dist/index.d.ts',
});

await access(path.join(packageRoot, rootExport.import));
await access(path.join(packageRoot, rootExport.require));
await access(path.join(packageRoot, rootExport.types));

assert.equal(requireFromFixture.resolve(packageJson.name), path.join(packageRoot, 'dist/index.cjs'));

const builtEntry = await readFile(path.join(packageRoot, rootExport.import), 'utf8');
assert.match(builtEntry, /^"use client";/);

const declarations = await readFile(path.join(packageRoot, rootExport.types), 'utf8');
assert.match(declarations, /monaco-editor\/esm\/vs\/editor\/editor\.api\.js/);
