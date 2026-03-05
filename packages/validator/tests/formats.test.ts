import { describe, it, expect } from 'vitest';
import { detectFormat, toJson, fromJson } from '../src/formats';

const minimal = {
  specforgeVersion: '1.0',
  project: {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Test Project',
  },
};

describe('detectFormat', () => {
  it('detects JSON', () => {
    expect(detectFormat('{"specforgeVersion": "1.0"}')).toBe('json');
  });

  it('detects JSON with leading whitespace', () => {
    expect(detectFormat('  \n  {"specforgeVersion": "1.0"}')).toBe('json');
  });

  it('detects JSON arrays', () => {
    expect(detectFormat('[{"id": "1"}]')).toBe('json');
  });

  it('detects YAML', () => {
    expect(detectFormat('specforgeVersion: "1.0"\nproject:\n  id: abc')).toBe('yaml');
  });
});

describe('JSON round-trip', () => {
  it('round-trips JSON', () => {
    const json = JSON.stringify(minimal, null, 2);
    const parsed = toJson(json, 'json');
    const back = fromJson(parsed, 'json');
    expect(JSON.parse(back)).toEqual(minimal);
  });
});

describe('YAML round-trip', () => {
  it('round-trips YAML', () => {
    const yaml = fromJson(minimal, 'yaml');
    const parsed = toJson(yaml, 'yaml');
    expect(parsed).toEqual(minimal);
  });
});

describe('toJson', () => {
  it('parses JSON string', () => {
    const result = toJson(JSON.stringify(minimal), 'json');
    expect(result).toEqual(minimal);
  });

  it('parses YAML string', () => {
    const yaml = 'specforgeVersion: "1.0"\nproject:\n  id: "00000000-0000-0000-0000-000000000001"\n  name: Test Project\n';
    const result = toJson(yaml, 'yaml');
    expect(result).toEqual(minimal);
  });

  it('throws on TOON without package', () => {
    expect(() => toJson('test', 'toon')).toThrow('TOON');
  });
});
