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
export declare function getReadyTickets(spec: OpenSpec): Ticket[];
export declare function getBlockedTickets(spec: OpenSpec): Ticket[];
export declare function getExecutionWaves(spec: OpenSpec): Ticket[][];
//# sourceMappingURL=dependencies.d.ts.map