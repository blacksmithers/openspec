import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvePatterns } from '../patterns';
import type { OpenSpec } from '../../parser/types';

const fixture: OpenSpec = JSON.parse(
  readFileSync(join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8')
);

describe('resolvePatterns', () => {
  it('returns the specification-level Patterns for Ticket 1', () => {
    const patterns = resolvePatterns(fixture, 'a1b2c3d4-0000-0000-0000-000000001001');
    expect(patterns).not.toBeNull();
    expect(patterns!.codeStandards).toBeDefined();
    expect(patterns!.commonImports).toBeDefined();
    expect(patterns!.returnTypes).toBeDefined();
  });

  it('returns the same specification-level Patterns for Ticket 2', () => {
    const patterns = resolvePatterns(fixture, 'a1b2c3d4-0000-0000-0000-000000001002');
    expect(patterns).not.toBeNull();
    expect(patterns!.codeStandards).toBeDefined();
    expect(patterns!.commonImports).toBeDefined();
    expect(patterns!.returnTypes).toBeDefined();
  });

  it('returns null for non-existent ID', () => {
    const patterns = resolvePatterns(fixture, 'non-existent-id');
    expect(patterns).toBeNull();
  });

  it('returned patterns contain codeStandards, commonImports, returnTypes', () => {
    const patterns = resolvePatterns(fixture, 'a1b2c3d4-0000-0000-0000-000000001001');
    expect(patterns).toMatchObject({
      codeStandards: expect.any(Object),
      commonImports: expect.any(Array),
      returnTypes: expect.any(Object),
    });
  });
});
