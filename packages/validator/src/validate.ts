import { join } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

// Resolve schema relative to the package root (works from both src/ and dist/)
const schema = require(join(__dirname, '..', '..', '..', 'versions', 'v1.0', 'specforge-schema.json'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateFn = ajv.compile(schema);

export function validate(spec: unknown): ValidationResult {
  const valid = validateFn(spec);
  if (valid) return { valid: true };
  return {
    valid: false,
    errors: (validateFn.errors ?? []).map(
      (e) => `${e.instancePath || '(root)'} ${e.message}`
    ),
  };
}

export const currentVersion = '1.0';
