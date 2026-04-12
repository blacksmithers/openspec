import type { OpenSpec, Ticket } from '../parser/types';
import { getTickets } from './hierarchy';

export function findTicketById(
  spec: OpenSpec,
  id: string
): Ticket | null {
  return getTickets(spec).find((t) => t.id === id) ?? null;
}

export function findTicketByNumber(
  spec: OpenSpec,
  ticketNumber: number
): Ticket | null {
  return getTickets(spec).find((t) => t.ticketNumber === ticketNumber) ?? null;
}

export function findByStatus(spec: OpenSpec, status: string): Ticket[] {
  return getTickets(spec).filter((t) => t.status === status);
}

export function findByTag(spec: OpenSpec, tag: string): Ticket[] {
  return getTickets(spec).filter((t) => (t.tags ?? []).includes(tag));
}
