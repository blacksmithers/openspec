"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePatterns = resolvePatterns;
function resolvePatterns(spec, ticketId) {
    for (const s of spec.specifications ?? []) {
        for (const epic of s.epics ?? []) {
            for (const ticket of epic.tickets ?? []) {
                if (ticket.id === ticketId) {
                    return s.patterns ?? null;
                }
            }
        }
    }
    return null;
}
//# sourceMappingURL=patterns.js.map