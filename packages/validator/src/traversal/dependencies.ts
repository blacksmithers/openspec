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
      edges.push({ from: ticket.id, to: dep.ticketId, type: dep.type });
    }
  }
  return { nodes, edges };
}

/**
 * Tickets that can be started immediately: those with no dependencies to wait
 * on. v1.1 has no per-ticket status, so readiness is derived purely from the
 * dependency graph (the entry points of the DAG).
 */
export function getReadyTickets(spec: OpenSpec): Ticket[] {
  return getTickets(spec).filter(
    (ticket) => (ticket.dependencies ?? []).length === 0
  );
}

/**
 * Tickets gated by a hard "blocks" dependency. v1.1 does not store a "blocked"
 * status; it is inferred from the presence of a blocking dependency edge.
 */
export function getBlockedTickets(spec: OpenSpec): Ticket[] {
  return getTickets(spec).filter((ticket) =>
    (ticket.dependencies ?? []).some((dep) => dep.type === 'blocks')
  );
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
      const allDeps = ticket.dependencies ?? [];
      const allResolved = allDeps.every((dep) =>
        // Dependencies on tickets outside this spec cannot gate ordering.
        !map.has(dep.ticketId) || done.has(dep.ticketId)
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
