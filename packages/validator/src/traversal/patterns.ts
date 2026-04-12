import type { OpenSpec, Patterns } from '../parser/types';

export function resolvePatterns(
  spec: OpenSpec,
  ticketId: string
): Patterns | null {
  for (const s of spec.specifications ?? []) {
    for (const epic of s.epics ?? []) {
      for (const ticket of epic.tickets ?? []) {
        if (ticket.id === ticketId) {
          return s.patterns ?? null;
        }
      }
    }
  }
  return null;
}
