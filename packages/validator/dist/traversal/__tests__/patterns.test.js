"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const patterns_1 = require("../patterns");
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.0', 'examples', 'todo-api.oschema.json'), 'utf-8'));
(0, vitest_1.describe)('resolvePatterns', () => {
    (0, vitest_1.it)('returns the specification-level Patterns for Ticket 1', () => {
        const patterns = (0, patterns_1.resolvePatterns)(fixture, 'a1b2c3d4-0000-0000-0000-000000001001');
        (0, vitest_1.expect)(patterns).not.toBeNull();
        (0, vitest_1.expect)(patterns.codeStandards).toBeDefined();
        (0, vitest_1.expect)(patterns.commonImports).toBeDefined();
        (0, vitest_1.expect)(patterns.returnTypes).toBeDefined();
    });
    (0, vitest_1.it)('returns the same specification-level Patterns for Ticket 2', () => {
        const patterns = (0, patterns_1.resolvePatterns)(fixture, 'a1b2c3d4-0000-0000-0000-000000001002');
        (0, vitest_1.expect)(patterns).not.toBeNull();
        (0, vitest_1.expect)(patterns.codeStandards).toBeDefined();
        (0, vitest_1.expect)(patterns.commonImports).toBeDefined();
        (0, vitest_1.expect)(patterns.returnTypes).toBeDefined();
    });
    (0, vitest_1.it)('returns null for non-existent ID', () => {
        const patterns = (0, patterns_1.resolvePatterns)(fixture, 'non-existent-id');
        (0, vitest_1.expect)(patterns).toBeNull();
    });
    (0, vitest_1.it)('returned patterns contain codeStandards, commonImports, returnTypes', () => {
        const patterns = (0, patterns_1.resolvePatterns)(fixture, 'a1b2c3d4-0000-0000-0000-000000001001');
        (0, vitest_1.expect)(patterns).toMatchObject({
            codeStandards: vitest_1.expect.any(Object),
            commonImports: vitest_1.expect.any(Array),
            returnTypes: vitest_1.expect.any(Object),
        });
    });
});
//# sourceMappingURL=patterns.test.js.map