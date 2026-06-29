import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvePatterns } from '../patterns';
import type { OpenSpec } from '../../parser/types';

// full: spec-level sharedPatterns [sp-errors]; ep-foundation also has
// sharedPatterns [sp-errors]; ep-checkout has none.
const fixture: OpenSpec = JSON.parse(
  readFileSync(
    join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'full.oschema.json'),
    'utf-8'
  )
);

describe('resolvePatterns', () => {
  it('merges spec-level and epic-level shared patterns for a ticket', () => {
    const patterns = resolvePatterns(fixture, 'tkt-gateway');
    expect(patterns).not.toBeNull();
    // spec-level sp-errors + epic-level sp-errors
    expect(patterns).toHaveLength(2);
    expect(patterns!.every((p) => p.name === 'Error handling')).toBe(true);
  });

  it('returns only spec-level patterns when the epic defines none', () => {
    const patterns = resolvePatterns(fixture, 'tkt-cart');
    expect(patterns).not.toBeNull();
    expect(patterns).toHaveLength(1);
    expect(patterns![0].id).toBe('sp-errors');
  });

  it('returns null for a non-existent ticket id', () => {
    expect(resolvePatterns(fixture, 'non-existent-id')).toBeNull();
  });
});
