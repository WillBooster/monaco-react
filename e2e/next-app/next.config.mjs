import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(appDir, '../..');
const builtEntry = path.join(packageRoot, 'dist/index.js');

if (!existsSync(builtEntry)) {
  throw new Error('Run `yarn build` before building the Next.js e2e fixture.');
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
