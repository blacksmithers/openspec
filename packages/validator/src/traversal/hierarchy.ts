import type { OpenSpec, Specification, Epic, Ticket, Blueprint } from '../parser/types';

/**
 * In v1.1 the root document IS the specification, so this returns the spec
 * itself wrapped in a single-element array.
 */
export function getSpecifications(spec: OpenSpec): Specification[] {
  return [spec];
}

export function getEpics(spec: OpenSpec): Epic[] {
  return spec.epics ?? [];
}

export function getTickets(spec: OpenSpec): Ticket[] {
  return getEpics(spec).flatMap((e) => e.tickets ?? []);
}

export function getBlueprints(spec: OpenSpec): Blueprint[] {
  return spec.blueprints ?? [];
}
