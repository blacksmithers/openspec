import type { OpenSpec, Ticket } from '../parser/types';
export declare function getAllTicketsMap(spec: OpenSpec): Map<string, Ticket>;
export declare function resolveDependencyGraph(spec: OpenSpec): {
    nodes: Map<string, Ticket>;
    edges: {
        from: string;
        to: string;
        type: 'blocks' | 'requires';
    }[];
};
/**
 * Tickets that can be started immediately: those with no dependencies to wait
 * on. v1.1 has no per-ticket status, so readiness is derived purely from the
 * dependency graph (the entry points of the DAG).
 */
export declare function getReadyTickets(spec: OpenSpec): Ticket[];
/**
 * Tickets gated by a hard "blocks" dependency. v1.1 does not store a "blocked"
 * status; it is inferred from the presence of a blocking dependency edge.
 */
export declare function getBlockedTickets(spec: OpenSpec): Ticket[];
export declare function getExecutionWaves(spec: OpenSpec): Ticket[][];
//# sourceMappingURL=dependencies.d.ts.map