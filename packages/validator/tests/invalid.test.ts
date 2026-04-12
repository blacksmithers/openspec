import { describe, it, expect } from 'vitest';
import { validate } from '../src/validator/validate';

describe('invalid specs', () => {
  it('rejects empty object', () => {
    const result = validate({});
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('rejects missing project', () => {
    const result = validate({ openSpecVersion: '1.0' });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.path.includes('project') || e.message.includes('project'))).toBe(true);
  });

  it('rejects missing openSpecVersion', () => {
    const result = validate({
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.path.includes('openSpecVersion') || e.message.includes('openSpecVersion'))).toBe(true);
  });

  it('rejects invalid openSpecVersion', () => {
    const result = validate({
      openSpecVersion: '2.0',
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
    });
    expect(result.valid).toBe(false);
  });

  it('rejects invalid project id format', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: 'not-a-uuid', name: 'Test' },
    });
    expect(result.valid).toBe(false);
  });

  it('rejects missing project name', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: '00000000-0000-0000-0000-000000000001' },
    });
    expect(result.valid).toBe(false);
  });

  it('rejects invalid specification status', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
      specifications: [
        { id: '00000000-0000-0000-0000-000000000002', title: 'Spec', status: 'invalid_status' },
      ],
    });
    expect(result.valid).toBe(false);
  });

  it('rejects invalid ticket complexity', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Spec',
          epics: [
            {
              id: '00000000-0000-0000-0000-000000000003',
              title: 'Epic',
              tickets: [
                {
                  id: '00000000-0000-0000-0000-000000000004',
                  title: 'Ticket',
                  complexity: 'huge',
                },
              ],
            },
          ],
        },
      ],
    });
    expect(result.valid).toBe(false);
  });

  it('rejects invalid dependency type', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Spec',
          epics: [
            {
              id: '00000000-0000-0000-0000-000000000003',
              title: 'Epic',
              tickets: [
                {
                  id: '00000000-0000-0000-0000-000000000004',
                  title: 'Ticket',
                  dependencies: [
                    { dependsOnId: '00000000-0000-0000-0000-000000000005', type: 'depends_on' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    expect(result.valid).toBe(false);
  });

  it('rejects invalid blueprint category', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Spec',
          blueprints: [
            {
              id: '00000000-0000-0000-0000-000000000005',
              title: 'Blueprint',
              category: 'invalid_category',
              content: 'content',
            },
          ],
        },
      ],
    });
    expect(result.valid).toBe(false);
  });

  it('rejects negative estimatedHours', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: { id: '00000000-0000-0000-0000-000000000001', name: 'Test' },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Spec',
          estimatedHours: -5,
        },
      ],
    });
    expect(result.valid).toBe(false);
  });
});
