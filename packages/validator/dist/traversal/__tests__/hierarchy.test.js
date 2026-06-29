"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const hierarchy_1 = require("../hierarchy");
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'todo-api.oschema.json'), 'utf-8'));
const emptySpec = { schemaVersion: '1.1', epics: [], blueprints: [] };
(0, vitest_1.describe)('getSpecifications', () => {
    (0, vitest_1.it)('returns the root spec as a single-element array', () => {
        const specs = (0, hierarchy_1.getSpecifications)(fixture);
        (0, vitest_1.expect)(specs).toHaveLength(1);
        (0, vitest_1.expect)(specs[0]).toBe(fixture);
    });
});
(0, vitest_1.describe)('getEpics', () => {
    (0, vitest_1.it)('returns 1 epic', () => {
        (0, vitest_1.expect)((0, hierarchy_1.getEpics)(fixture)).toHaveLength(1);
    });
    (0, vitest_1.it)('returns empty array when there are no epics', () => {
        (0, vitest_1.expect)((0, hierarchy_1.getEpics)(emptySpec)).toHaveLength(0);
    });
});
(0, vitest_1.describe)('getTickets', () => {
    (0, vitest_1.it)('returns 2 tickets', () => {
        (0, vitest_1.expect)((0, hierarchy_1.getTickets)(fixture)).toHaveLength(2);
    });
    (0, vitest_1.it)('returns empty array when there are no epics', () => {
        (0, vitest_1.expect)((0, hierarchy_1.getTickets)(emptySpec)).toHaveLength(0);
    });
});
(0, vitest_1.describe)('getBlueprints', () => {
    (0, vitest_1.it)('returns 1 blueprint', () => {
        (0, vitest_1.expect)((0, hierarchy_1.getBlueprints)(fixture)).toHaveLength(1);
    });
    (0, vitest_1.it)('returns empty array when there are no blueprints', () => {
        (0, vitest_1.expect)((0, hierarchy_1.getBlueprints)(emptySpec)).toHaveLength(0);
    });
});
//# sourceMappingURL=hierarchy.test.js.map