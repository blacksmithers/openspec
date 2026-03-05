import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import ChangelogPage from '@/components/ChangelogPage';

export const metadata: Metadata = {
  title: 'Changelog — SpecForge Format v1.0',
  description: 'All notable changes to the SpecForge Format specification.',
};

export default function ChangelogRoute() {
  return (
    <AppShell>
      <ChangelogPage />
    </AppShell>
  );
}
