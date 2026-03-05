#!/usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import { validate } from './validate';
import { toJson, type SpecFormat } from './formats';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: specforge-validate <spec-file.[json|yaml|toon]>');
  process.exit(1);
}

const raw = readFileSync(filePath, 'utf-8');
const extMap: Record<string, SpecFormat> = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.toon': 'toon',
};
const format = extMap[extname(filePath)] ?? undefined;

let parsed: unknown;
try {
  parsed = toJson(raw, format);
} catch (e) {
  console.error(`Could not parse file as ${format ?? 'auto-detected format'}:`, e);
  process.exit(1);
}

const result = validate(parsed);
if (result.valid) {
  const spec = parsed as { specforgeVersion?: string };
  console.log(`Valid SpecForge spec (v${spec.specforgeVersion}) — ${format ?? 'auto'}`);
  process.exit(0);
} else {
  console.error('Invalid SpecForge spec:');
  result.errors?.forEach((e) => console.error('  -', e));
  process.exit(1);
}
