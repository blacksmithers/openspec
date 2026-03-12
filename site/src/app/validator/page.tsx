import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import ValidatorPage from '@/components/ValidatorPage';

export const metadata: Metadata = {
  title: 'Validator CLI — SpecForge Format v1.0',
  description: 'Standalone offline validator for the SpecForge Format. Supports JSON, YAML, and TOON with zero SaaS dependency.',
  alternates: {
    canonical: 'https://schema.specforge.tech/validator/',
  },
};

export default function ValidatorRoute() {
  return (
    <AppShell>
      <ValidatorPage />
    </AppShell>
  );
}
