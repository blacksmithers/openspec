import { describe, it, expect } from 'vitest';
import { validate } from '../src/validator/validate';

describe('valid specs', () => {
  it('accepts minimal spec', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Test Project',
      },
    });
    expect(result.valid).toBe(true);
  });

  it('accepts spec with specifications array', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Test Project',
      },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Test Specification',
          status: 'draft',
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('accepts spec with epics and tickets', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Test Project',
      },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Test Spec',
          epics: [
            {
              id: '00000000-0000-0000-0000-000000000003',
              title: 'Test Epic',
              epicNumber: 1,
              status: 'todo',
              tickets: [
                {
                  id: '00000000-0000-0000-0000-000000000004',
                  title: 'Test Ticket',
                  ticketNumber: 1,
                  status: 'pending',
                  complexity: 'small',
                  priority: 'medium',
                },
              ],
            },
          ],
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('accepts spec with blueprint', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Test Project',
      },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Test Spec',
          blueprints: [
            {
              id: '00000000-0000-0000-0000-000000000005',
              title: 'Architecture Diagram',
              category: 'architecture',
              content: 'graph TD; A-->B;',
              format: 'mermaid',
              status: 'draft',
            },
          ],
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('accepts spec with dependencies', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Test Project',
      },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Test Spec',
          epics: [
            {
              id: '00000000-0000-0000-0000-000000000003',
              title: 'Test Epic',
              tickets: [
                {
                  id: '00000000-0000-0000-0000-000000000004',
                  title: 'Ticket A',
                },
                {
                  id: '00000000-0000-0000-0000-000000000005',
                  title: 'Ticket B',
                  dependencies: [
                    {
                      dependsOnId: '00000000-0000-0000-0000-000000000004',
                      type: 'blocks',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    expect(result.valid).toBe(true);
  });

  it('accepts spec with patterns', () => {
    const result = validate({
      openSpecVersion: '1.0',
      project: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Test Project',
      },
      specifications: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          title: 'Test Spec',
          patterns: {
            codeStandards: { language: 'TypeScript', naming: 'camelCase' },
            commonImports: ["import { Result } from './result';"],
            returnTypes: { success: 'Result<T>', error: 'Result<never, E>' },
          },
        },
      ],
    });
    expect(result.valid).toBe(true);
  });
});
