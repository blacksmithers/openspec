"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePatterns = resolvePatterns;
/**
 * Collect the shared patterns that apply to a given ticket: the spec-level
 * `sharedPatterns` plus any defined on the ticket's owning epic. Returns null
 * when no ticket with the given id exists in the spec.
 */
function resolvePatterns(spec, ticketId) {
    for (const epic of spec.epics ?? []) {
        for (const ticket of epic.tickets ?? []) {
            if (ticket.id === ticketId) {
                return [...(spec.sharedPatterns ?? []), ...(epic.sharedPatterns ?? [])];
            }
        }
    }
    return null;
}
//# sourceMappingURL=patterns.js.map