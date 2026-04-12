"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const dependencies_1 = require("../dependencies");
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8'));
const noDepsSpec = {
    openSpecVersion: '1.0',
    project: { id: '00000000-0000-0000-0000-000000000001', name: 'no-deps' },
    specifications: [{
            id: '00000000-0000-0000-0000-000000000010',
            title: 'Test',
            epics: [{
                    id: '00000000-0000-0000-0000-000000000100',
                    title: 'Epic',
                    tickets: [
                        { id: '00000000-0000-0000-0000-000000001001', title: 'T1', status: 'pending' },
                        { id: '00000000-0000-0000-0000-000000001002', title: 'T2', status: 'ready' },
                    ],
                }],
        }],
};
const allDoneSpec = {
    openSpecVersion: '1.0',
    project: { id: '00000000-0000-0000-0000-000000000001', name: 'all-done' },
    specifications: [{
            id: '00000000-0000-0000-0000-000000000010',
            title: 'Test',
            epics: [{
                    id: '00000000-0000-0000-0000-000000000100',
                    title: 'Epic',
                    tickets: [
                        { id: '00000000-0000-0000-0000-000000001001', title: 'T1', status: 'done' },
                        {
                            id: '00000000-0000-0000-0000-000000001002',
                            title: 'T2',
                            status: 'pending',
                            dependencies: [{ dependsOnId: '00000000-0000-0000-0000-000000001001', type: 'blocks' }],
                        },
                    ],
                }],
        }],
};
(0, vitest_1.describe)('getAllTicketsMap', () => {
    (0, vitest_1.it)('returns Map with 3 entries', () => {
        const map = (0, dependencies_1.getAllTicketsMap)(fixture);
        (0, vitest_1.expect)(map.size).toBe(3);
    });
});
(0, vitest_1.describe)('getReadyTickets', () => {
    (0, vitest_1.it)('returns only Ticket 1 (no unresolved blockers)', () => {
        const ready = (0, dependencies_1.getReadyTickets)(fixture);
        (0, vitest_1.expect)(ready).toHaveLength(1);
        (0, vitest_1.expect)(ready[0].ticketNumber).toBe(1);
    });
    (0, vitest_1.it)('returns all tickets as ready when no dependencies', () => {
        const ready = (0, dependencies_1.getReadyTickets)(noDepsSpec);
        (0, vitest_1.expect)(ready).toHaveLength(2);
    });
    (0, vitest_1.it)('returns blocked tickets as ready when all blockers are done', () => {
        const ready = (0, dependencies_1.getReadyTickets)(allDoneSpec);
        (0, vitest_1.expect)(ready).toHaveLength(1);
        (0, vitest_1.expect)(ready[0].ticketNumber).toBeUndefined(); // T2 has no ticketNumber in this fixture
        (0, vitest_1.expect)(ready[0].title).toBe('T2');
    });
});
(0, vitest_1.describe)('getBlockedTickets', () => {
    (0, vitest_1.it)('returns Ticket 3 (blocked by Ticket 2 via blocks)', () => {
        const blocked = (0, dependencies_1.getBlockedTickets)(fixture);
        (0, vitest_1.expect)(blocked).toHaveLength(1);
        (0, vitest_1.expect)(blocked[0].ticketNumber).toBe(3);
    });
    (0, vitest_1.it)('Ticket 2 is NOT in blockedTickets (its dependency is requires, not blocks)', () => {
        const blocked = (0, dependencies_1.getBlockedTickets)(fixture);
        const ticket2Blocked = blocked.find(t => t.ticketNumber === 2);
        (0, vitest_1.expect)(ticket2Blocked).toBeUndefined();
    });
});
(0, vitest_1.describe)('getExecutionWaves', () => {
    (0, vitest_1.it)('returns 3 waves: [[T1], [T2], [T3]]', () => {
        const waves = (0, dependencies_1.getExecutionWaves)(fixture);
        (0, vitest_1.expect)(waves).toHaveLength(3);
        (0, vitest_1.expect)(waves[0]).toHaveLength(1);
        (0, vitest_1.expect)(waves[0][0].ticketNumber).toBe(1);
        (0, vitest_1.expect)(waves[1]).toHaveLength(1);
        (0, vitest_1.expect)(waves[1][0].ticketNumber).toBe(2);
        (0, vitest_1.expect)(waves[2]).toHaveLength(1);
        (0, vitest_1.expect)(waves[2][0].ticketNumber).toBe(3);
    });
});
(0, vitest_1.describe)('resolveDependencyGraph', () => {
    (0, vitest_1.it)('returns 2 edges with correct types', () => {
        const graph = (0, dependencies_1.resolveDependencyGraph)(fixture);
        (0, vitest_1.expect)(graph.edges).toHaveLength(2);
        const requiresEdge = graph.edges.find(e => e.type === 'requires');
        (0, vitest_1.expect)(requiresEdge).toBeDefined();
        const blocksEdge = graph.edges.find(e => e.type === 'blocks');
        (0, vitest_1.expect)(blocksEdge).toBeDefined();
    });
});
//# sourceMappingURL=dependencies.test.js.map