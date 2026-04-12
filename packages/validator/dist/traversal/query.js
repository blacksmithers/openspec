"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTicketById = findTicketById;
exports.findTicketByNumber = findTicketByNumber;
exports.findByStatus = findByStatus;
exports.findByTag = findByTag;
const hierarchy_1 = require("./hierarchy");
function findTicketById(spec, id) {
    return (0, hierarchy_1.getTickets)(spec).find((t) => t.id === id) ?? null;
}
function findTicketByNumber(spec, ticketNumber) {
    return (0, hierarchy_1.getTickets)(spec).find((t) => t.ticketNumber === ticketNumber) ?? null;
}
function findByStatus(spec, status) {
    return (0, hierarchy_1.getTickets)(spec).filter((t) => t.status === status);
}
function findByTag(spec, tag) {
    return (0, hierarchy_1.getTickets)(spec).filter((t) => (t.tags ?? []).includes(tag));
}
//# sourceMappingURL=query.js.map