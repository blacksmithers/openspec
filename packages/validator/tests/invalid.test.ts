import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { validate } from '../src/validator/validate';

const examplesDir = join(__dirname, '..', '..', '..', 'versions', 'v1.1', 'examples');

// Returns `any` so individual tests can mutate/delete fields to construct
// invalid variants of an otherwise-valid example.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadExample(name: string): any {
  return JSON.parse(readFileSync(join(examplesDir, `${name}.oschema.json`), 'utf-8'));
}

describe('invalid specs (v1.1)', () => {
  it('rejects empty object', () => {
    const result = validate({});
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('rejects a document missing required top-level keys', () => {
    const result = validate({ schemaVersion: '1.1' });
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.message.includes('required property'))
    ).toBe(true);
  });

  it('rejects a missing schemaVersion', () => {
    const spec = loadExample('minimal');
    delete spec.schemaVersion;
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects a wrong schemaVersion ("2.0")', () => {
    const spec = loadExample('minimal');
    spec.schemaVersion = '2.0';
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects the old v1.0 schemaVersion ("1.0")', () => {
    const spec = loadExample('minimal');
    spec.schemaVersion = '1.0';
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects unknown top-level properties (additionalProperties)', () => {
    const spec = loadExample('minimal');
    spec.openSpecVersion = '1.0';
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects an invalid ticket complexity', () => {
    const spec = loadExample('todo-api');
    spec.epics[0].tickets[0].complexity = 'huge';
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects an invalid dependency type', () => {
    const spec = loadExample('todo-api');
    spec.epics[0].tickets[1].dependencies[0].type = 'depends_on';
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects an invalid blueprint category', () => {
    const spec = loadExample('todo-api');
    spec.blueprints[0].category = 'invalid_category';
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects a negative estimatedMinutes on a ticket', () => {
    const spec = loadExample('todo-api');
    spec.epics[0].tickets[0].estimatedMinutes = -5;
    expect(validate(spec).valid).toBe(false);
  });

  it('rejects a dependency referencing a non-existent ticket', () => {
    const spec = loadExample('todo-api');
    spec.epics[0].tickets[1].dependencies[0].ticketId = 'does-not-exist';
    const result = validate(spec);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.message.includes('does not exist'))).toBe(true);
  });
});
