import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import FormatSwitcher from '@/components/FormatSwitcher';

export const metadata: Metadata = {
  title: 'File Formats — OpenSpec v1.0',
  description: 'Three lossless representations of the OpenSpec schema: JSON, YAML, and TOON. Compare formats and token efficiency.',
  alternates: {
    canonical: 'https://openspec.tech/formats/',
  },
};

export default function FormatsRoute() {
  return (
    <AppShell>
      <FormatSwitcher />
    </AppShell>
  );
}
