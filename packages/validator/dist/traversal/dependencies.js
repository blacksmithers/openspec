"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTicketsMap = getAllTicketsMap;
exports.resolveDependencyGraph = resolveDependencyGraph;
exports.getReadyTickets = getReadyTickets;
exports.getBlockedTickets = getBlockedTickets;
exports.getExecutionWaves = getExecutionWaves;
const hierarchy_1 = require("./hierarchy");
function getAllTicketsMap(spec) {
    const map = new Map();
    for (const ticket of (0, hierarchy_1.getTickets)(spec)) {
        map.set(ticket.id, ticket);
    }
    return map;
}
function resolveDependencyGraph(spec) {
    const nodes = getAllTicketsMap(spec);
    const edges = [];
    for (const ticket of nodes.values()) {
        for (const dep of ticket.dependencies ?? []) {
            edges.push({ from: ticket.id, to: dep.dependsOnId, type: dep.type });
        }
    }
    return { nodes, edges };
}
function getReadyTickets(spec) {
    const map = getAllTicketsMap(spec);
    return [...map.values()].filter((ticket) => {
        if (ticket.status !== 'pending' && ticket.status !== 'ready')
            return false;
        const deps = (ticket.dependencies ?? [])
            .map((dep) => map.get(dep.dependsOnId))
            .filter(Boolean);
        return deps.every((dep) => dep.status === 'done');
    });
}
function getBlockedTickets(spec) {
    const map = getAllTicketsMap(spec);
    return [...map.values()].filter((ticket) => {
        const blockDeps = (ticket.dependencies ?? []).filter((dep) => dep.type === 'blocks');
        if (blockDeps.length === 0)
            return false;
        return blockDeps.some((dep) => {
            const blocker = map.get(dep.dependsOnId);
            return blocker && blocker.status !== 'done';
        });
    });
}
function getExecutionWaves(spec) {
    const map = getAllTicketsMap(spec);
    const tickets = [...map.values()];
    const done = new Set();
    const waves = [];
    const remaining = new Set(tickets.map((t) => t.id));
    while (remaining.size > 0) {
        const wave = [];
        for (const id of remaining) {
            const ticket = map.get(id);
            // Both blocks and requires affect wave ordering:
            // blocks = hard gate, requires = needs output
            const allDeps = (ticket.dependencies ?? []);
            const allResolved = allDeps.every((dep) => done.has(dep.dependsOnId));
            if (allResolved) {
                wave.push(ticket);
            }
        }
        if (wave.length === 0) {
            // Circular dependency — push remaining to break the cycle
            for (const id of remaining) {
                wave.push(map.get(id));
            }
        }
        for (const t of wave) {
            remaining.delete(t.id);
            done.add(t.id);
        }
        waves.push(wave);
    }
    return waves;
}
//# sourceMappingURL=dependencies.js.map