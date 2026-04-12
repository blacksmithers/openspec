import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import ValidatorPage from '@/components/ValidatorPage';

export const metadata: Metadata = {
  title: 'Validator CLI — OpenSpec v1.0',
  description: 'Standalone offline validator for OpenSpec. Supports JSON, YAML, and TOON with zero SaaS dependency.',
  alternates: {
    canonical: 'https://openspec.tech/validator/',
  },
};

export default function ValidatorRoute() {
  return (
    <AppShell>
      <ValidatorPage />
    </AppShell>
  );
}
