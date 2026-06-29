import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  getAllTicketsMap,
  getReadyTickets,
  getBlockedTickets,
  getExecutionWaves,
  resolveDependencyGraph,
} from '../dependencies';
import type { OpenSpec } from '../../parser/types';

// todo-api: 2 tickets, tkt-list (requires) -> tkt-create
const fixture: OpenSpec = JSON.parse(
  readFileSync(
    join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'todo-api.oschema.json'),
    'utf-8'
  )
);

// Minimal graph-shaped fixture exercising a hard "blocks" dependency.
const blocksSpec = {
  schemaVersion: '1.1',
  epics: [
    {
      tickets: [
        { id: 'T1', ticketNumber: 1, dependencies: [] },
        { id: 'T2', ticketNumber: 2, dependencies: [{ ticketId: 'T1', type: 'blocks' }] },
      ],
    },
  ],
} as unknown as OpenSpec;

describe('getAllTicketsMap', () => {
  it('returns a Map with one entry per ticket', () => {
    expect(getAllTicketsMap(fixture).size).toBe(2);
  });
});

describe('resolveDependencyGraph', () => {
  it('returns one edge keyed by ticketId', () => {
    const graph = resolveDependencyGraph(fixture);
    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0].type).toBe('requires');
    // tkt-list depends on tkt-create
    expect(graph.edges[0].to).toBe('tkt-create');
  });
});

describe('getReadyTickets', () => {
  it('returns tickets with no dependencies', () => {
    const ready = getReadyTickets(fixture);
    expect(ready).toHaveLength(1);
    expect(ready[0].id).toBe('tkt-create');
  });

  it('returns the unblocked entry point in the blocks fixture', () => {
    const ready = getReadyTickets(blocksSpec);
    expect(ready).toHaveLength(1);
    expect(ready[0].ticketNumber).toBe(1);
  });
});

describe('getBlockedTickets', () => {
  it('returns nothing when only "requires" edges exist', () => {
    expect(getBlockedTickets(fixture)).toHaveLength(0);
  });

  it('returns tickets gated by a "blocks" dependency', () => {
    const blocked = getBlockedTickets(blocksSpec);
    expect(blocked).toHaveLength(1);
    expect(blocked[0].ticketNumber).toBe(2);
  });
});

describe('getExecutionWaves', () => {
  it('orders tickets into dependency waves', () => {
    const waves = getExecutionWaves(fixture);
    expect(waves).toHaveLength(2);
    expect(waves[0]).toHaveLength(1);
    expect(waves[0][0].id).toBe('tkt-create');
    expect(waves[1]).toHaveLength(1);
    expect(waves[1][0].id).toBe('tkt-list');
  });
});
