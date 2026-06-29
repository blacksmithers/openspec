"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTicketById = findTicketById;
exports.findTicketByNumber = findTicketByNumber;
const hierarchy_1 = require("./hierarchy");
function findTicketById(spec, id) {
    return (0, hierarchy_1.getTickets)(spec).find((t) => t.id === id) ?? null;
}
function findTicketByNumber(spec, ticketNumber) {
    return (0, hierarchy_1.getTickets)(spec).find((t) => t.ticketNumber === ticketNumber) ?? null;
}
//# sourceMappingURL=query.js.map