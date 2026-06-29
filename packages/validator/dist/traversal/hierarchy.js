"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecifications = getSpecifications;
exports.getEpics = getEpics;
exports.getTickets = getTickets;
exports.getBlueprints = getBlueprints;
/**
 * In v1.1 the root document IS the specification, so this returns the spec
 * itself wrapped in a single-element array.
 */
function getSpecifications(spec) {
    return [spec];
}
function getEpics(spec) {
    return spec.epics ?? [];
}
function getTickets(spec) {
    return getEpics(spec).flatMap((e) => e.tickets ?? []);
}
function getBlueprints(spec) {
    return spec.blueprints ?? [];
}
//# sourceMappingURL=hierarchy.js.map