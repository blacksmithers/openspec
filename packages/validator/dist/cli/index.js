#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const parse_1 = require("../parser/parse");
const detect_1 = require("../parser/detect");
const validate_1 = require("../validator/validate");
const hierarchy_1 = require("../traversal/hierarchy");
const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: openspec <spec-file.[json|yaml|toon]>');
    process.exit(1);
}
let raw;
try {
    raw = (0, fs_1.readFileSync)(filePath, 'utf-8');
}
catch {
    console.error(`File not found: ${filePath}`);
    process.exit(2);
}
const extMap = {
    '.json': 'json',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.toon': 'toon',
};
const format = extMap[(0, path_1.extname)(filePath)] ?? (0, detect_1.detectFormat)(raw);
let parsed;
try {
    parsed = (0, parse_1.parse)(raw, format);
}
catch (e) {
    console.error(`Could not parse file as ${format}:`, e instanceof Error ? e.message : e);
    process.exit(2);
}
const result = (0, validate_1.validate)(parsed);
if (result.valid) {
    const specs = (0, hierarchy_1.getSpecifications)(parsed);
    const epics = (0, hierarchy_1.getEpics)(parsed);
    const tickets = (0, hierarchy_1.getTickets)(parsed);
    const blueprints = (0, hierarchy_1.getBlueprints)(parsed);
    let depCount = 0;
    for (const t of tickets) {
        depCount += (t.dependencies ?? []).length;
    }
    console.log(`\u2713 Valid OpenSpec (v${parsed.openSpecVersion}) \u2014 ${format}`);
    console.log('');
    console.log(`  Project:        ${parsed.project.name}`);
    console.log(`  Specifications: ${specs.length}`);
    console.log(`  Epics:          ${epics.length}`);
    console.log(`  Tickets:        ${tickets.length}`);
    console.log(`  Blueprints:     ${blueprints.length}`);
    console.log(`  Dependencies:   ${depCount}`);
    process.exit(0);
}
else {
    console.error(`\u2717 Validation failed (${result.errors.length} error${result.errors.length === 1 ? '' : 's'})`);
    console.error('');
    for (const err of result.errors) {
        console.error(`  ERROR  ${err.path}`);
        console.error(`         ${err.message}`);
        if (err.hint) {
            console.error('');
            console.error(`  HINT   ${err.hint}`);
        }
        console.error('');
    }
    process.exit(1);
}
//# sourceMappingURL=index.js.map