import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getSpecifications, getEpics, getTickets, getBlueprints } from '../hierarchy';
import type { OpenSpec } from '../../parser/types';

const fixture: OpenSpec = JSON.parse(
  readFileSync(
    join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'todo-api.oschema.json'),
    'utf-8'
  )
);

const emptySpec = { schemaVersion: '1.1', epics: [], blueprints: [] } as unknown as OpenSpec;

describe('getSpecifications', () => {
  it('returns the root spec as a single-element array', () => {
    const specs = getSpecifications(fixture);
    expect(specs).toHaveLength(1);
    expect(specs[0]).toBe(fixture);
  });
});

describe('getEpics', () => {
  it('returns 1 epic', () => {
    expect(getEpics(fixture)).toHaveLength(1);
  });

  it('returns empty array when there are no epics', () => {
    expect(getEpics(emptySpec)).toHaveLength(0);
  });
});

describe('getTickets', () => {
  it('returns 2 tickets', () => {
    expect(getTickets(fixture)).toHaveLength(2);
  });

  it('returns empty array when there are no epics', () => {
    expect(getTickets(emptySpec)).toHaveLength(0);
  });
});

describe('getBlueprints', () => {
  it('returns 1 blueprint', () => {
    expect(getBlueprints(fixture)).toHaveLength(1);
  });

  it('returns empty array when there are no blueprints', () => {
    expect(getBlueprints(emptySpec)).toHaveLength(0);
  });
});
