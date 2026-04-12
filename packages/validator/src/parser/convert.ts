import { stringify as stringifyYaml } from 'yaml';
import type { OpenSpec } from './types';

export function toJson(spec: OpenSpec): string {
  return JSON.stringify(spec, null, 2);
}

export function toYaml(spec: OpenSpec): string {
  return stringifyYaml(spec);
}

export function toToon(_spec: OpenSpec): string {
  throw new Error('TOON format requires @toon-format/toon package.');
}
