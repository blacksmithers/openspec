"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentVersion = void 0;
exports.validateWithSchema = validateWithSchema;
exports.validate = validate;
const fs_1 = require("fs");
const path_1 = require("path");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const hierarchy_1 = require("../traversal/hierarchy");
exports.currentVersion = '1.0';
function buildHint(instancePath, message, spec) {
    // Status "blocked" hint
    if (instancePath.includes('/status') && message.includes('blocked')) {
        return 'Blocked state is inferred from the dependency graph, not stored as an explicit status. See: openspec.tech/why#status-that-shouldnt-exist';
    }
    // Invalid dependency type hint
    if (instancePath.includes('/dependencies/') && instancePath.includes('/type')) {
        return '"blocks" = hard gate (cannot start until done). "requires" = needs output (can be scheduled flexibly)';
    }
    // Missing project hint
    if (instancePath === '' && message?.includes('project')) {
        return 'The root object must contain a "project" with at least "id" and "name".';
    }
    // Check for dependsOnId referencing non-existent ticket via Ajv format error
    void spec;
    return undefined;
}
function validateDependencyReferences(spec) {
    const errors = [];
    const tickets = (0, hierarchy_1.getTickets)(spec);
    const allTicketIds = new Set(tickets.map((t) => t.id));
    for (const ticket of tickets) {
        for (const dep of ticket.dependencies ?? []) {
            if (!allTicketIds.has(dep.dependsOnId)) {
                errors.push({
                    path: `/tickets/${ticket.id}/dependencies`,
                    message: `references ticket "${dep.dependsOnId}" which does not exist in the spec.`,
                    hint: `The dependsOnId "${dep.dependsOnId}" does not match any ticket ID in this spec. Verify the UUID is correct.`,
                });
            }
        }
    }
    return errors;
}
/**
 * Browser-safe validation: validates a spec against a provided schema object.
 * Does NOT use any Node.js APIs (no require, no fs, no path).
 */
function validateWithSchema(spec, schema) {
    const ajv = new ajv_1.default({ allErrors: true });
    (0, ajv_formats_1.default)(ajv);
    const validateFn = ajv.compile(schema);
    const valid = validateFn(spec);
    const errors = [];
    if (!valid) {
        for (const e of validateFn.errors ?? []) {
            const path = e.instancePath || '(root)';
            const message = e.message ?? 'Unknown validation error';
            const hint = buildHint(e.instancePath, message, spec);
            errors.push({ path, message, ...(hint ? { hint } : {}) });
        }
    }
    // Custom validation: check dependency references
    if (valid || errors.length === 0) {
        const depErrors = validateDependencyReferences(spec);
        if (depErrors.length > 0) {
            return { valid: false, errors: depErrors };
        }
    }
    else {
        // Still run dependency checks even if schema invalid, but only if it's parseable enough
        try {
            const depErrors = validateDependencyReferences(spec);
            errors.push(...depErrors);
        }
        catch {
            // Spec too malformed for dependency checking
        }
    }
    if (errors.length > 0) {
        return { valid: false, errors };
    }
    return { valid: true, errors: [] };
}
/**
 * Node.js-only validation: loads the schema from disk and validates.
 */
function validate(spec) {
    const schema = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', 'versions', 'v1.0', 'openspec-schema.json'), 'utf-8'));
    return validateWithSchema(spec, schema);
}
//# sourceMappingURL=validate.js.map