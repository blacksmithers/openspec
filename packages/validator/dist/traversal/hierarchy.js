"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecifications = getSpecifications;
exports.getEpics = getEpics;
exports.getTickets = getTickets;
exports.getBlueprints = getBlueprints;
function getSpecifications(spec) {
    return spec.specifications ?? [];
}
function getEpics(spec) {
    return (spec.specifications ?? []).flatMap((s) => s.epics ?? []);
}
function getTickets(spec) {
    return getEpics(spec).flatMap((e) => e.tickets ?? []);
}
function getBlueprints(spec) {
    return (spec.specifications ?? []).flatMap((s) => s.blueprints ?? []);
}
//# sourceMappingURL=hierarchy.js.map