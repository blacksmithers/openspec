import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getSpecifications, getEpics, getTickets, getBlueprints } from '../hierarchy';
import type { OpenSpec } from '../../parser/types';

const fixture: OpenSpec = JSON.parse(
  readFileSync(join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8')
);

const emptySpec: OpenSpec = {
  openSpecVersion: '1.0',
  project: { id: '00000000-0000-0000-0000-000000000001', name: 'empty' },
};

describe('getSpecifications', () => {
  it('returns 1 specification', () => {
    expect(getSpecifications(fixture)).toHaveLength(1);
  });

  it('returns empty array for empty spec', () => {
    expect(getSpecifications(emptySpec)).toHaveLength(0);
  });
});

describe('getEpics', () => {
  it('returns 2 epics', () => {
    expect(getEpics(fixture)).toHaveLength(2);
  });

  it('returns empty array for empty spec', () => {
    expect(getEpics(emptySpec)).toHaveLength(0);
  });
});

describe('getTickets', () => {
  it('returns 3 tickets', () => {
    expect(getTickets(fixture)).toHaveLength(3);
  });

  it('returns empty array for empty spec', () => {
    expect(getTickets(emptySpec)).toHaveLength(0);
  });
});

describe('getBlueprints', () => {
  it('returns 1 blueprint', () => {
    expect(getBlueprints(fixture)).toHaveLength(1);
  });

  it('returns empty array for empty spec', () => {
    expect(getBlueprints(emptySpec)).toHaveLength(0);
  });
});
