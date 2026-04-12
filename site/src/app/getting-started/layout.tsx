import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started — OpenSpec',
  description:
    'Write, validate, and use an OpenSpec spec in five minutes. No account required.',
  alternates: { canonical: 'https://openspec.tech/getting-started/' },
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
