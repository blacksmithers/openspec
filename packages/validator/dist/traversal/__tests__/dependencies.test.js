"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const dependencies_1 = require("../dependencies");
// todo-api: 2 tickets, tkt-list (requires) -> tkt-create
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'todo-api.oschema.json'), 'utf-8'));
// Minimal graph-shaped fixture exercising a hard "blocks" dependency.
const blocksSpec = {
    schemaVersion: '1.1',
    epics: [
        {
            tickets: [
                { id: 'T1', ticketNumber: 1, dependencies: [] },
                { id: 'T2', ticketNumber: 2, dependencies: [{ ticketId: 'T1', type: 'blocks' }] },
            ],
        },
    ],
};
(0, vitest_1.describe)('getAllTicketsMap', () => {
    (0, vitest_1.it)('returns a Map with one entry per ticket', () => {
        (0, vitest_1.expect)((0, dependencies_1.getAllTicketsMap)(fixture).size).toBe(2);
    });
});
(0, vitest_1.describe)('resolveDependencyGraph', () => {
    (0, vitest_1.it)('returns one edge keyed by ticketId', () => {
        const graph = (0, dependencies_1.resolveDependencyGraph)(fixture);
        (0, vitest_1.expect)(graph.edges).toHaveLength(1);
        (0, vitest_1.expect)(graph.edges[0].type).toBe('requires');
        // tkt-list depends on tkt-create
        (0, vitest_1.expect)(graph.edges[0].to).toBe('tkt-create');
    });
});
(0, vitest_1.describe)('getReadyTickets', () => {
    (0, vitest_1.it)('returns tickets with no dependencies', () => {
        const ready = (0, dependencies_1.getReadyTickets)(fixture);
        (0, vitest_1.expect)(ready).toHaveLength(1);
        (0, vitest_1.expect)(ready[0].id).toBe('tkt-create');
    });
    (0, vitest_1.it)('returns the unblocked entry point in the blocks fixture', () => {
        const ready = (0, dependencies_1.getReadyTickets)(blocksSpec);
        (0, vitest_1.expect)(ready).toHaveLength(1);
        (0, vitest_1.expect)(ready[0].ticketNumber).toBe(1);
    });
});
(0, vitest_1.describe)('getBlockedTickets', () => {
    (0, vitest_1.it)('returns nothing when only "requires" edges exist', () => {
        (0, vitest_1.expect)((0, dependencies_1.getBlockedTickets)(fixture)).toHaveLength(0);
    });
    (0, vitest_1.it)('returns tickets gated by a "blocks" dependency', () => {
        const blocked = (0, dependencies_1.getBlockedTickets)(blocksSpec);
        (0, vitest_1.expect)(blocked).toHaveLength(1);
        (0, vitest_1.expect)(blocked[0].ticketNumber).toBe(2);
    });
});
(0, vitest_1.describe)('getExecutionWaves', () => {
    (0, vitest_1.it)('orders tickets into dependency waves', () => {
        const waves = (0, dependencies_1.getExecutionWaves)(fixture);
        (0, vitest_1.expect)(waves).toHaveLength(2);
        (0, vitest_1.expect)(waves[0]).toHaveLength(1);
        (0, vitest_1.expect)(waves[0][0].id).toBe('tkt-create');
        (0, vitest_1.expect)(waves[1]).toHaveLength(1);
        (0, vitest_1.expect)(waves[1][0].id).toBe('tkt-list');
    });
});
//# sourceMappingURL=dependencies.test.js.map