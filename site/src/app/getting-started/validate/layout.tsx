import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Validate a Spec — OpenSpec',
  description:
    'Install the OpenSpec validator CLI and check specs against the v1.0 schema. See useful error messages for common mistakes.',
  alternates: { canonical: 'https://openspec.tech/getting-started/validate/' },
};

export default function ValidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
