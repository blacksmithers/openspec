import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { validate } from '../src/validator/validate';

const examplesDir = join(__dirname, '..', '..', '..', 'versions', 'v1.1', 'examples');

function loadExample(name: string): unknown {
  return JSON.parse(readFileSync(join(examplesDir, `${name}.oschema.json`), 'utf-8'));
}

describe('valid specs (v1.1)', () => {
  it.each(['minimal', 'todo-api', 'with-dependencies', 'full'])(
    'accepts the %s example',
    (name) => {
      const result = validate(loadExample(name));
      expect(result.errors).toHaveLength(0);
      expect(result.valid).toBe(true);
    }
  );

  it('accepts a spec with epics, tickets, and dependencies', () => {
    const result = validate(loadExample('with-dependencies'));
    expect(result.valid).toBe(true);
  });

  it('accepts a spec with shared patterns and blueprints', () => {
    const result = validate(loadExample('full'));
    expect(result.valid).toBe(true);
  });
});
