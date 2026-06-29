import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { findTicketById, findTicketByNumber } from '../query';
import type { OpenSpec } from '../../parser/types';

const fixture: OpenSpec = JSON.parse(
  readFileSync(
    join(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'todo-api.oschema.json'),
    'utf-8'
  )
);

describe('findTicketById', () => {
  it('returns the matching ticket for a valid id', () => {
    const ticket = findTicketById(fixture, 'tkt-create');
    expect(ticket).not.toBeNull();
    expect(ticket!.title).toBe('Implement POST /todos');
  });

  it('returns null for an unknown id', () => {
    expect(findTicketById(fixture, 'non-existent-id')).toBeNull();
  });
});

describe('findTicketByNumber', () => {
  it('findTicketByNumber(1) returns the first ticket', () => {
    const ticket = findTicketByNumber(fixture, 1);
    expect(ticket).not.toBeNull();
    expect(ticket!.title).toBe('Implement POST /todos');
  });

  it('findTicketByNumber(2) returns the second ticket', () => {
    const ticket = findTicketByNumber(fixture, 2);
    expect(ticket).not.toBeNull();
    expect(ticket!.title).toBe('Implement GET /todos');
  });

  it('returns null when no ticket has the given number', () => {
    expect(findTicketByNumber(fixture, 99)).toBeNull();
  });
});
