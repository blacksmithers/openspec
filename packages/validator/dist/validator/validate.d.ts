import type { ValidationResult } from '../parser/types';
export declare const currentVersion = "1.0";
/**
 * Browser-safe validation: validates a spec against a provided schema object.
 * Does NOT use any Node.js APIs (no require, no fs, no path).
 */
export declare function validateWithSchema(spec: unknown, schema: object): ValidationResult;
/**
 * Node.js-only validation: loads the schema from disk and validates.
 */
export declare function validate(spec: unknown): ValidationResult;
//# sourceMappingURL=validate.d.ts.map