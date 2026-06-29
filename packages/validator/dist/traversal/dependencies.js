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
            edges.push({ from: ticket.id, to: dep.ticketId, type: dep.type });
        }
    }
    return { nodes, edges };
}
/**
 * Tickets that can be started immediately: those with no dependencies to wait
 * on. v1.1 has no per-ticket status, so readiness is derived purely from the
 * dependency graph (the entry points of the DAG).
 */
function getReadyTickets(spec) {
    return (0, hierarchy_1.getTickets)(spec).filter((ticket) => (ticket.dependencies ?? []).length === 0);
}
/**
 * Tickets gated by a hard "blocks" dependency. v1.1 does not store a "blocked"
 * status; it is inferred from the presence of a blocking dependency edge.
 */
function getBlockedTickets(spec) {
    return (0, hierarchy_1.getTickets)(spec).filter((ticket) => (ticket.dependencies ?? []).some((dep) => dep.type === 'blocks'));
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
            const allDeps = ticket.dependencies ?? [];
            const allResolved = allDeps.every((dep) => 
            // Dependencies on tickets outside this spec cannot gate ordering.
            !map.has(dep.ticketId) || done.has(dep.ticketId));
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