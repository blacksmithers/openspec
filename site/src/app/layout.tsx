import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'OpenSpec — Open Standard for AI Agent Orchestration',
  description: 'The open specification format for AI agent orchestration. Browse the schema, validate specs, and explore file formats.',
  alternates: {
    canonical: 'https://openspec.tech/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/openspec-favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#08080a" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
