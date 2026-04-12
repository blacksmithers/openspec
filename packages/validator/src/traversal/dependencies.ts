import type { OpenSpec, Ticket } from '../parser/types';
import { getTickets } from './hierarchy';

export function getAllTicketsMap(spec: OpenSpec): Map<string, Ticket> {
  const map = new Map<string, Ticket>();
  for (const ticket of getTickets(spec)) {
    map.set(ticket.id, ticket);
  }
  return map;
}

export function resolveDependencyGraph(spec: OpenSpec): {
  nodes: Map<string, Ticket>;
  edges: { from: string; to: string; type: 'blocks' | 'requires' }[];
} {
  const nodes = getAllTicketsMap(spec);
  const edges: { from: string; to: string; type: 'blocks' | 'requires' }[] = [];
  for (const ticket of nodes.values()) {
    for (const dep of ticket.dependencies ?? []) {
      edges.push({ from: ticket.id, to: dep.dependsOnId, type: dep.type });
    }
  }
  return { nodes, edges };
}

export function getReadyTickets(spec: OpenSpec): Ticket[] {
  const map = getAllTicketsMap(spec);
  return [...map.values()].filter((ticket) => {
    if (ticket.status !== 'pending' && ticket.status !== 'ready') return false;
    const deps = (ticket.dependencies ?? [])
      .map((dep) => map.get(dep.dependsOnId))
      .filter(Boolean) as Ticket[];
    return deps.every((dep) => dep.status === 'done');
  });
}

export function getBlockedTickets(spec: OpenSpec): Ticket[] {
  const map = getAllTicketsMap(spec);
  return [...map.values()].filter((ticket) => {
    const blockDeps = (ticket.dependencies ?? []).filter(
      (dep) => dep.type === 'blocks'
    );
    if (blockDeps.length === 0) return false;
    return blockDeps.some((dep) => {
      const blocker = map.get(dep.dependsOnId);
      return blocker && blocker.status !== 'done';
    });
  });
}

export function getExecutionWaves(spec: OpenSpec): Ticket[][] {
  const map = getAllTicketsMap(spec);
  const tickets = [...map.values()];
  const done = new Set<string>();
  const waves: Ticket[][] = [];
  const remaining = new Set(tickets.map((t) => t.id));

  while (remaining.size > 0) {
    const wave: Ticket[] = [];
    for (const id of remaining) {
      const ticket = map.get(id)!;
      // Both blocks and requires affect wave ordering:
      // blocks = hard gate, requires = needs output
      const allDeps = (ticket.dependencies ?? []);
      const allResolved = allDeps.every((dep) =>
        done.has(dep.dependsOnId)
      );
      if (allResolved) {
        wave.push(ticket);
      }
    }
    if (wave.length === 0) {
      // Circular dependency — push remaining to break the cycle
      for (const id of remaining) {
        wave.push(map.get(id)!);
      }
    }
    for (const t of wave) {
      remaining.delete(t.id);
      done.add(t.id);
    }
    waves.push(wave);
  }
  return waves;
}
