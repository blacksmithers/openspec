import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import ChangelogPage from '@/components/ChangelogPage';

export const metadata: Metadata = {
  title: 'Changelog — OpenSpec v1.0',
  description: 'All notable changes to the OpenSpec specification.',
  alternates: {
    canonical: 'https://openspec.tech/changelog/',
  },
};

export default function ChangelogRoute() {
  return (
    <AppShell>
      <ChangelogPage />
    </AppShell>
  );
}
