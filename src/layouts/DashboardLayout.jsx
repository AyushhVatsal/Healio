import Sidebar from '../components/Sidebar.jsx';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />
      <main className="flex-1 ">
        {children}
      </main>
    </div>
  );
}

