import { readFileSync } from 'fs';
import { join } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { OpenSpec, ValidationResult, ValidationError } from '../parser/types';
import { getTickets } from '../traversal/hierarchy';

export const currentVersion = '1.1';

function buildHint(instancePath: string, message: string, spec: unknown): string | undefined {
  // Status "blocked" hint: v1.1 has no per-ticket status; blocked is derived.
  if (instancePath.includes('/status') && message.includes('blocked')) {
    return 'Blocked state is inferred from the dependency graph, not stored as an explicit status. See: openspec.tech/why#status-that-shouldnt-exist';
  }

  // Invalid dependency type hint
  if (instancePath.includes('/dependencies/') && instancePath.includes('/type')) {
    return '"blocks" = hard gate (cannot start until done). "requires" = needs output (can be scheduled flexibly)';
  }

  // Missing required top-level keys hint
  if (instancePath === '' && message?.includes('required property')) {
    return 'An OpenSpec v1.1 document is a single specification. Required top-level keys: schemaVersion ("1.1"), id, projectId, title, status, goals, requirements, architecture, scope, techStack, folderStructures, acceptanceCriteria, nonFunctionalRequirements, guardrails, epics, blueprints.';
  }

  // Check for ticketId referencing non-existent ticket via Ajv format error
  void spec;

  return undefined;
}

function validateDependencyReferences(spec: OpenSpec): ValidationError[] {
  const errors: ValidationError[] = [];
  const tickets = getTickets(spec);
  const allTicketIds = new Set(tickets.map((t) => t.id));

  for (const ticket of tickets) {
    for (const dep of ticket.dependencies ?? []) {
      if (!allTicketIds.has(dep.ticketId)) {
        errors.push({
          path: `/tickets/${ticket.id}/dependencies`,
          message: `references ticket "${dep.ticketId}" which does not exist in the spec.`,
          hint: `The ticketId "${dep.ticketId}" does not match any ticket ID in this spec. Verify the id is correct.`,
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
export function validateWithSchema(spec: unknown, schema: object): ValidationResult {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validateFn = ajv.compile(schema);

  const valid = validateFn(spec);

  const errors: ValidationError[] = [];

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
    const depErrors = validateDependencyReferences(spec as OpenSpec);
    if (depErrors.length > 0) {
      return { valid: false, errors: depErrors };
    }
  } else {
    // Still run dependency checks even if schema invalid, but only if it's parseable enough
    try {
      const depErrors = validateDependencyReferences(spec as OpenSpec);
      errors.push(...depErrors);
    } catch {
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
export function validate(spec: unknown): ValidationResult {
  const schema = JSON.parse(
    readFileSync(join(__dirname, '..', '..', '..', '..', 'versions', 'v1.1', 'openspec-schema.json'), 'utf-8')
  );
  return validateWithSchema(spec, schema);
}
