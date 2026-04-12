import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { findTicketById, findTicketByNumber, findByStatus, findByTag } from '../query';
import type { OpenSpec } from '../../parser/types';

const fixture: OpenSpec = JSON.parse(
  readFileSync(join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8')
);

describe('findTicketById', () => {
  it('returns correct ticket with valid UUID', () => {
    const ticket = findTicketById(fixture, 'a1b2c3d4-0000-0000-0000-000000001001');
    expect(ticket).not.toBeNull();
    expect(ticket!.title).toBe('Define Todo types and Zod schemas');
  });

  it('returns null with invalid UUID', () => {
    const ticket = findTicketById(fixture, 'non-existent-uuid');
    expect(ticket).toBeNull();
  });
});

describe('findTicketByNumber', () => {
  it('findTicketByNumber(1) returns "Define Todo types and Zod schemas"', () => {
    const ticket = findTicketByNumber(fixture, 1);
    expect(ticket).not.toBeNull();
    expect(ticket!.title).toBe('Define Todo types and Zod schemas');
  });
});

describe('findByStatus', () => {
  it('findByStatus("pending") returns Tickets 2 and 3', () => {
    const tickets = findByStatus(fixture, 'pending');
    expect(tickets).toHaveLength(2);
    const numbers = tickets.map(t => t.ticketNumber).sort();
    expect(numbers).toEqual([2, 3]);
  });

  it('findByStatus("ready") returns Ticket 1', () => {
    const tickets = findByStatus(fixture, 'ready');
    expect(tickets).toHaveLength(1);
    expect(tickets[0].ticketNumber).toBe(1);
  });
});

describe('findByTag', () => {
  it('findByTag("types") returns Ticket 1', () => {
    const tickets = findByTag(fixture, 'types');
    expect(tickets).toHaveLength(1);
    expect(tickets[0].ticketNumber).toBe(1);
  });

  it('findByTag("nonexistent") returns empty array', () => {
    const tickets = findByTag(fixture, 'nonexistent');
    expect(tickets).toHaveLength(0);
  });
});
