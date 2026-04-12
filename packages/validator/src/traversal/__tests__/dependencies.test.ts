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

const fixture: OpenSpec = JSON.parse(
  readFileSync(join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8')
);

const noDepsSpec: OpenSpec = {
  openSpecVersion: '1.0',
  project: { id: '00000000-0000-0000-0000-000000000001', name: 'no-deps' },
  specifications: [{
    id: '00000000-0000-0000-0000-000000000010',
    title: 'Test',
    epics: [{
      id: '00000000-0000-0000-0000-000000000100',
      title: 'Epic',
      tickets: [
        { id: '00000000-0000-0000-0000-000000001001', title: 'T1', status: 'pending' },
        { id: '00000000-0000-0000-0000-000000001002', title: 'T2', status: 'ready' },
      ],
    }],
  }],
};

const allDoneSpec: OpenSpec = {
  openSpecVersion: '1.0',
  project: { id: '00000000-0000-0000-0000-000000000001', name: 'all-done' },
  specifications: [{
    id: '00000000-0000-0000-0000-000000000010',
    title: 'Test',
    epics: [{
      id: '00000000-0000-0000-0000-000000000100',
      title: 'Epic',
      tickets: [
        { id: '00000000-0000-0000-0000-000000001001', title: 'T1', status: 'done' },
        {
          id: '00000000-0000-0000-0000-000000001002',
          title: 'T2',
          status: 'pending',
          dependencies: [{ dependsOnId: '00000000-0000-0000-0000-000000001001', type: 'blocks' }],
        },
      ],
    }],
  }],
};

describe('getAllTicketsMap', () => {
  it('returns Map with 3 entries', () => {
    const map = getAllTicketsMap(fixture);
    expect(map.size).toBe(3);
  });
});

describe('getReadyTickets', () => {
  it('returns only Ticket 1 (no unresolved blockers)', () => {
    const ready = getReadyTickets(fixture);
    expect(ready).toHaveLength(1);
    expect(ready[0].ticketNumber).toBe(1);
  });

  it('returns all tickets as ready when no dependencies', () => {
    const ready = getReadyTickets(noDepsSpec);
    expect(ready).toHaveLength(2);
  });

  it('returns blocked tickets as ready when all blockers are done', () => {
    const ready = getReadyTickets(allDoneSpec);
    expect(ready).toHaveLength(1);
    expect(ready[0].ticketNumber).toBeUndefined(); // T2 has no ticketNumber in this fixture
    expect(ready[0].title).toBe('T2');
  });
});

describe('getBlockedTickets', () => {
  it('returns Ticket 3 (blocked by Ticket 2 via blocks)', () => {
    const blocked = getBlockedTickets(fixture);
    expect(blocked).toHaveLength(1);
    expect(blocked[0].ticketNumber).toBe(3);
  });

  it('Ticket 2 is NOT in blockedTickets (its dependency is requires, not blocks)', () => {
    const blocked = getBlockedTickets(fixture);
    const ticket2Blocked = blocked.find(t => t.ticketNumber === 2);
    expect(ticket2Blocked).toBeUndefined();
  });
});

describe('getExecutionWaves', () => {
  it('returns 3 waves: [[T1], [T2], [T3]]', () => {
    const waves = getExecutionWaves(fixture);
    expect(waves).toHaveLength(3);
    expect(waves[0]).toHaveLength(1);
    expect(waves[0][0].ticketNumber).toBe(1);
    expect(waves[1]).toHaveLength(1);
    expect(waves[1][0].ticketNumber).toBe(2);
    expect(waves[2]).toHaveLength(1);
    expect(waves[2][0].ticketNumber).toBe(3);
  });
});

describe('resolveDependencyGraph', () => {
  it('returns 2 edges with correct types', () => {
    const graph = resolveDependencyGraph(fixture);
    expect(graph.edges).toHaveLength(2);

    const requiresEdge = graph.edges.find(e => e.type === 'requires');
    expect(requiresEdge).toBeDefined();

    const blocksEdge = graph.edges.find(e => e.type === 'blocks');
    expect(blocksEdge).toBeDefined();
  });
});
