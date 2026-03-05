import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'SpecForge Format — Open Standard for AI Agent Orchestration',
  description: 'The open specification format for AI agent orchestration. Browse the schema, validate specs, and explore file formats.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://schema.specforge.tech/" />
        <meta name="theme-color" content="#08080a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
