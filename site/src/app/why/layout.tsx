import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Traditional Tickets Fail for AI Agents — SpecForge Format',
  description:
    'AI agents hallucinate when given human-style tickets. The SpecForge Format was distilled from 400+ builds to solve this. Every field exists because its absence caused a real failure.',
  alternates: {
    canonical: 'https://schema.specforge.tech/why/',
  },
  openGraph: {
    title: 'Why Traditional Tickets Fail for AI Agents',
    description:
      'The design rationale behind the SpecForge Format. Eight lessons from 400+ production builds across 14M+ lines of TypeScript.',
    url: 'https://schema.specforge.tech/why/',
    siteName: 'SpecForge Format',
    type: 'article',
    images: [{ url: '/openspec-og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Traditional Tickets Fail for AI Agents',
    description:
      'The design rationale behind the SpecForge Format. Eight lessons from 400+ production builds.',
  },
};

export default function WhyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
