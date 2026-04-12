#!/usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import { parse } from '../parser/parse';
import { detectFormat } from '../parser/detect';
import type { SpecFormat } from '../parser/detect';
import { validate } from '../validator/validate';
import {
  getSpecifications,
  getEpics,
  getTickets,
  getBlueprints,
} from '../traversal/hierarchy';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: openspec <spec-file.[json|yaml|toon]>');
  process.exit(1);
}

let raw: string;
try {
  raw = readFileSync(filePath, 'utf-8');
} catch {
  console.error(`File not found: ${filePath}`);
  process.exit(2);
}

const extMap: Record<string, SpecFormat> = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.toon': 'toon',
};
const format = extMap[extname(filePath)] ?? detectFormat(raw);

let parsed: ReturnType<typeof parse>;
try {
  parsed = parse(raw, format);
} catch (e) {
  console.error(
    `Could not parse file as ${format}:`,
    e instanceof Error ? e.message : e
  );
  process.exit(2);
}

const result = validate(parsed);
if (result.valid) {
  const specs = getSpecifications(parsed);
  const epics = getEpics(parsed);
  const tickets = getTickets(parsed);
  const blueprints = getBlueprints(parsed);
  let depCount = 0;
  for (const t of tickets) {
    depCount += (t.dependencies ?? []).length;
  }

  console.log(
    `\u2713 Valid OpenSpec (v${parsed.openSpecVersion}) \u2014 ${format}`
  );
  console.log('');
  console.log(`  Project:        ${parsed.project.name}`);
  console.log(`  Specifications: ${specs.length}`);
  console.log(`  Epics:          ${epics.length}`);
  console.log(`  Tickets:        ${tickets.length}`);
  console.log(`  Blueprints:     ${blueprints.length}`);
  console.log(`  Dependencies:   ${depCount}`);
  process.exit(0);
} else {
  console.error(
    `\u2717 Validation failed (${result.errors.length} error${result.errors.length === 1 ? '' : 's'})`
  );
  console.error('');
  for (const err of result.errors) {
    console.error(`  ERROR  ${err.path}`);
    console.error(`         ${err.message}`);
    if (err.hint) {
      console.error('');
      console.error(`  HINT   ${err.hint}`);
    }
    console.error('');
  }
  process.exit(1);
}
