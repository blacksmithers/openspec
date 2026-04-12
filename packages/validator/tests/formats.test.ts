import { describe, it, expect } from 'vitest';
import { detectFormat } from '../src/parser/detect';
import { parse } from '../src/parser/parse';
import { toJson, toYaml } from '../src/parser/convert';
import type { OpenSpec } from '../src/parser/types';

const minimal: OpenSpec = {
  openSpecVersion: '1.0',
  project: {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Test Project',
  },
};

describe('detectFormat', () => {
  it('detects JSON', () => {
    expect(detectFormat('{"openSpecVersion": "1.0"}')).toBe('json');
  });

  it('detects JSON with leading whitespace', () => {
    expect(detectFormat('  \n  {"openSpecVersion": "1.0"}')).toBe('json');
  });

  it('detects JSON arrays', () => {
    expect(detectFormat('[{"id": "1"}]')).toBe('json');
  });

  it('detects YAML', () => {
    expect(detectFormat('openSpecVersion: "1.0"\nproject:\n  id: abc')).toBe('yaml');
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
    const yaml = 'openSpecVersion: "1.0"\nproject:\n  id: "00000000-0000-0000-0000-000000000001"\n  name: Test Project\n';
    const result = parse(yaml, 'yaml');
    expect(result).toEqual(minimal);
  });

  it('throws on TOON without package', () => {
    expect(() => parse('test', 'toon')).toThrow('TOON');
  });
});
