"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs_1 = require("fs");
const path_1 = require("path");
const patterns_1 = require("../patterns");
// full: spec-level sharedPatterns [sp-errors]; ep-foundation also has
// sharedPatterns [sp-errors]; ep-checkout has none.
const fixture = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'versions', 'v1.1', 'examples', 'full.oschema.json'), 'utf-8'));
(0, vitest_1.describe)('resolvePatterns', () => {
    (0, vitest_1.it)('merges spec-level and epic-level shared patterns for a ticket', () => {
        const patterns = (0, patterns_1.resolvePatterns)(fixture, 'tkt-gateway');
        (0, vitest_1.expect)(patterns).not.toBeNull();
        // spec-level sp-errors + epic-level sp-errors
        (0, vitest_1.expect)(patterns).toHaveLength(2);
        (0, vitest_1.expect)(patterns.every((p) => p.name === 'Error handling')).toBe(true);
    });
    (0, vitest_1.it)('returns only spec-level patterns when the epic defines none', () => {
        const patterns = (0, patterns_1.resolvePatterns)(fixture, 'tkt-cart');
        (0, vitest_1.expect)(patterns).not.toBeNull();
        (0, vitest_1.expect)(patterns).toHaveLength(1);
        (0, vitest_1.expect)(patterns[0].id).toBe('sp-errors');
    });
    (0, vitest_1.it)('returns null for a non-existent ticket id', () => {
        (0, vitest_1.expect)((0, patterns_1.resolvePatterns)(fixture, 'non-existent-id')).toBeNull();
    });
});
//# sourceMappingURL=patterns.test.js.map