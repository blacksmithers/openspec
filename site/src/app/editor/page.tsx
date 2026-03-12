import type { Metadata } from 'next';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LiveEditor from '@/components/LiveEditor';

export const metadata: Metadata = {
  title: 'Live Editor — SpecForge Format v1.0',
  description: 'Paste or write a SpecForge spec file and validate it in real-time against the v1.0 schema.',
  alternates: {
    canonical: 'https://schema.specforge.tech/editor/',
  },
};

export default function EditorRoute() {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <div className="main" style={{ overflow: 'hidden' }}>
        <LiveEditor />
      </div>
    </div>
  );
}
