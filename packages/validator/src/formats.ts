import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

export type SpecFormat = 'json' | 'yaml' | 'toon';

export function detectFormat(input: string): SpecFormat {
  const trimmed = input.trimStart();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json';
  if (/\[\d+,?\]\{/.test(input)) return 'toon';
  return 'yaml';
}

export function toJson(input: string, format?: SpecFormat): unknown {
  const fmt = format ?? detectFormat(input);
  if (fmt === 'json') return JSON.parse(input);
  if (fmt === 'yaml') return parseYaml(input);
  if (fmt === 'toon') {
    throw new Error('TOON format requires @toon-format/toon package. Install it separately.');
  }
  throw new Error(`Unknown format: ${fmt}`);
}

export function fromJson(data: unknown, format: SpecFormat): string {
  if (format === 'json') return JSON.stringify(data, null, 2);
  if (format === 'yaml') return stringifyYaml(data);
  if (format === 'toon') {
    throw new Error('TOON format requires @toon-format/toon package. Install it separately.');
  }
  throw new Error(`Unknown format: ${format}`);
}
