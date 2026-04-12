import type { OpenSpec, Specification, Epic, Ticket, Blueprint } from '../parser/types';

export function getSpecifications(spec: OpenSpec): Specification[] {
  return spec.specifications ?? [];
}

export function getEpics(spec: OpenSpec): Epic[] {
  return (spec.specifications ?? []).flatMap((s) => s.epics ?? []);
}

export function getTickets(spec: OpenSpec): Ticket[] {
  return getEpics(spec).flatMap((e) => e.tickets ?? []);
}

export function getBlueprints(spec: OpenSpec): Blueprint[] {
  return (spec.specifications ?? []).flatMap((s) => s.blueprints ?? []);
}
