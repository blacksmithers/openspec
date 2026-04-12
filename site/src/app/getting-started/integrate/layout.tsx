import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use OpenSpec Specs Programmatically — OpenSpec',
  description:
    'Parse, validate, and traverse OpenSpec specs in code. Build validators, converters, generators, and executors on the open format.',
  alternates: { canonical: 'https://openspec.tech/getting-started/integrate/' },
};

export default function IntegrateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
