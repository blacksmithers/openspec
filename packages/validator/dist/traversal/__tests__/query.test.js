"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const query_1 = require("../query");
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8'));
(0, vitest_1.describe)('findTicketById', () => {
    (0, vitest_1.it)('returns correct ticket with valid UUID', () => {
        const ticket = (0, query_1.findTicketById)(fixture, 'a1b2c3d4-0000-0000-0000-000000001001');
        (0, vitest_1.expect)(ticket).not.toBeNull();
        (0, vitest_1.expect)(ticket.title).toBe('Define Todo types and Zod schemas');
    });
    (0, vitest_1.it)('returns null with invalid UUID', () => {
        const ticket = (0, query_1.findTicketById)(fixture, 'non-existent-uuid');
        (0, vitest_1.expect)(ticket).toBeNull();
    });
});
(0, vitest_1.describe)('findTicketByNumber', () => {
    (0, vitest_1.it)('findTicketByNumber(1) returns "Define Todo types and Zod schemas"', () => {
        const ticket = (0, query_1.findTicketByNumber)(fixture, 1);
        (0, vitest_1.expect)(ticket).not.toBeNull();
        (0, vitest_1.expect)(ticket.title).toBe('Define Todo types and Zod schemas');
    });
});
(0, vitest_1.describe)('findByStatus', () => {
    (0, vitest_1.it)('findByStatus("pending") returns Tickets 2 and 3', () => {
        const tickets = (0, query_1.findByStatus)(fixture, 'pending');
        (0, vitest_1.expect)(tickets).toHaveLength(2);
        const numbers = tickets.map(t => t.ticketNumber).sort();
        (0, vitest_1.expect)(numbers).toEqual([2, 3]);
    });
    (0, vitest_1.it)('findByStatus("ready") returns Ticket 1', () => {
        const tickets = (0, query_1.findByStatus)(fixture, 'ready');
        (0, vitest_1.expect)(tickets).toHaveLength(1);
        (0, vitest_1.expect)(tickets[0].ticketNumber).toBe(1);
    });
});
(0, vitest_1.describe)('findByTag', () => {
    (0, vitest_1.it)('findByTag("types") returns Ticket 1', () => {
        const tickets = (0, query_1.findByTag)(fixture, 'types');
        (0, vitest_1.expect)(tickets).toHaveLength(1);
        (0, vitest_1.expect)(tickets[0].ticketNumber).toBe(1);
    });
    (0, vitest_1.it)('findByTag("nonexistent") returns empty array', () => {
        const tickets = (0, query_1.findByTag)(fixture, 'nonexistent');
        (0, vitest_1.expect)(tickets).toHaveLength(0);
    });
});
//# sourceMappingURL=query.test.js.map