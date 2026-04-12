import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import SchemaExplorer from '@/components/SchemaExplorer';

export const metadata: Metadata = {
  title: 'Schema Explorer — OpenSpec v1.0',
  description: 'Browse every entity and field in the OpenSpec v1.0 schema with types, requirements, and descriptions.',
  alternates: {
    canonical: 'https://openspec.tech/schema/',
  },
};

export default function SchemaRoute() {
  return (
    <AppShell>
      <SchemaExplorer />
    </AppShell>
  );
}
