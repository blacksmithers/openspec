"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const query_1 = require("../query");
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'todo-api.oschema.json'), 'utf-8'));
(0, vitest_1.describe)('findTicketById', () => {
    (0, vitest_1.it)('returns the matching ticket for a valid id', () => {
        const ticket = (0, query_1.findTicketById)(fixture, 'tkt-create');
        (0, vitest_1.expect)(ticket).not.toBeNull();
        (0, vitest_1.expect)(ticket.title).toBe('Implement POST /todos');
    });
    (0, vitest_1.it)('returns null for an unknown id', () => {
        (0, vitest_1.expect)((0, query_1.findTicketById)(fixture, 'non-existent-id')).toBeNull();
    });
});
(0, vitest_1.describe)('findTicketByNumber', () => {
    (0, vitest_1.it)('findTicketByNumber(1) returns the first ticket', () => {
        const ticket = (0, query_1.findTicketByNumber)(fixture, 1);
        (0, vitest_1.expect)(ticket).not.toBeNull();
        (0, vitest_1.expect)(ticket.title).toBe('Implement POST /todos');
    });
    (0, vitest_1.it)('findTicketByNumber(2) returns the second ticket', () => {
        const ticket = (0, query_1.findTicketByNumber)(fixture, 2);
        (0, vitest_1.expect)(ticket).not.toBeNull();
        (0, vitest_1.expect)(ticket.title).toBe('Implement GET /todos');
    });
    (0, vitest_1.it)('returns null when no ticket has the given number', () => {
        (0, vitest_1.expect)((0, query_1.findTicketByNumber)(fixture, 99)).toBeNull();
    });
});
//# sourceMappingURL=query.test.js.map