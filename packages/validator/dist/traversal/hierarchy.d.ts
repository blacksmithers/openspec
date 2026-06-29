import type { OpenSpec, Specification, Epic, Ticket, Blueprint } from '../parser/types';
/**
 * In v1.1 the root document IS the specification, so this returns the spec
 * itself wrapped in a single-element array.
 */
export declare function getSpecifications(spec: OpenSpec): Specification[];
export declare function getEpics(spec: OpenSpec): Epic[];
export declare function getTickets(spec: OpenSpec): Ticket[];
export declare function getBlueprints(spec: OpenSpec): Blueprint[];
//# sourceMappingURL=hierarchy.d.ts.map