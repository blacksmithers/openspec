import type { OpenSpec, SharedPattern } from '../parser/types';

/**
 * Collect the shared patterns that apply to a given ticket: the spec-level
 * `sharedPatterns` plus any defined on the ticket's owning epic. Returns null
 * when no ticket with the given id exists in the spec.
 */
export function resolvePatterns(
  spec: OpenSpec,
  ticketId: string
): SharedPattern[] | null {
  for (const epic of spec.epics ?? []) {
    for (const ticket of epic.tickets ?? []) {
      if (ticket.id === ticketId) {
        return [...(spec.sharedPatterns ?? []), ...(epic.sharedPatterns ?? [])];
      }
    }
  }
  return null;
}
