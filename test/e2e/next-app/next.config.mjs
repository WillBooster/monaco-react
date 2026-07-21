import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(appDir, '../../..');
const builtEntry = path.join(packageRoot, 'dist/index.js');

if (!existsSync(builtEntry)) {
  throw new Error('Run `bun run build` before building the Next.js e2e fixture.');
}

// Bun's isolated install with the global store symlinks node_modules into ~/.bun,
// which Turbopack rejects unless its root encloses the store. Use the common ancestor
// of the project and the home directory (the home dir locally, `/` in Docker builds).
function commonAncestor(a, b) {
  const aParts = a.split(path.sep);
  const bParts = b.split(path.sep);
  const shared = [];
  for (let i = 0; i < Math.min(aParts.length, bParts.length) && aParts[i] === bParts[i]; i++) {
    shared.push(aParts[i]);
  }
  return shared.join(path.sep) || path.sep;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The repo pins the native TypeScript 7 preview, whose package lacks the classic compiler API
  // that Next's in-build TypeScript verification expects (yarn used to bridge this with a builtin
  // compat patch; bun does not). The fixture's types are already checked by the repo's own `tsc`
  // (tsconfig includes test/**), so skip Next's redundant check to keep the build working under bun.
  typescript: { ignoreBuildErrors: true },
  turbopack: {
    root: commonAncestor(process.cwd(), os.homedir()),
  },
};

export default nextConfig;
