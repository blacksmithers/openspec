import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <div className="main">
        {children}
      </div>
    </div>
  );
}
