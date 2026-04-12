import type { OpenSpec, Ticket } from '../parser/types';
export declare function findTicketById(spec: OpenSpec, id: string): Ticket | null;
export declare function findTicketByNumber(spec: OpenSpec, ticketNumber: number): Ticket | null;
export declare function findByStatus(spec: OpenSpec, status: string): Ticket[];
export declare function findByTag(spec: OpenSpec, tag: string): Ticket[];
//# sourceMappingURL=query.d.ts.map