import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { detectFormat } from '../src/parser/detect';
import { parse } from '../src/parser/parse';
import { toJson, toYaml } from '../src/parser/convert';
import type { OpenSpec } from '../src/parser/types';

const minimal = JSON.parse(
  readFileSync(
    join(__dirname, '..', '..', '..', 'versions', 'v1.1', 'examples', 'minimal.oschema.json'),
    'utf-8'
  )
) as OpenSpec;

describe('detectFormat', () => {
  it('detects JSON', () => {
    expect(detectFormat('{"schemaVersion": "1.1"}')).toBe('json');
  });

  it('detects JSON with leading whitespace', () => {
    expect(detectFormat('  \n  {"schemaVersion": "1.1"}')).toBe('json');
  });

  it('detects JSON arrays', () => {
    expect(detectFormat('[{"id": "1"}]')).toBe('json');
  });

  it('detects YAML', () => {
    expect(detectFormat('schemaVersion: "1.1"\nid: abc')).toBe('yaml');
  });
});

describe('JSON round-trip', () => {
  it('round-trips JSON', () => {
    const json = JSON.stringify(minimal, null, 2);
    const parsed = parse(json, 'json');
    const back = toJson(parsed);
    expect(JSON.parse(back)).toEqual(minimal);
  });
});

describe('YAML round-trip', () => {
  it('round-trips YAML', () => {
    const yaml = toYaml(minimal);
    const parsed = parse(yaml, 'yaml');
    expect(parsed).toEqual(minimal);
  });
});

describe('parse', () => {
  it('parses JSON string', () => {
    const result = parse(JSON.stringify(minimal), 'json');
    expect(result).toEqual(minimal);
  });

  it('parses YAML string', () => {
    const yaml = 'schemaVersion: "1.1"\nid: spec-x\ntitle: Test Spec\n';
    const result = parse(yaml, 'yaml');
    expect(result).toEqual({
      schemaVersion: '1.1',
      id: 'spec-x',
      title: 'Test Spec',
    });
  });

  it('throws on TOON without package', () => {
    expect(() => parse('test', 'toon')).toThrow('TOON');
  });
});
