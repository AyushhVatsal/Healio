import logo from '../assets/logo.png';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '🏠' },
  { label: 'Add Habit', href: '/add', icon: '➕' },
  { label: 'Insights', href: '/insights', icon: '📊' },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-28 flex-col items-center border-r border-slate-200 bg-white">
      <div className="mt-0 mb-6 flex justify-center">
        <img
          src={logo}
          alt="Healio logo"
          className="h-26 w-28 object-contain"
        />
      </div>

    <nav className="flex flex-1 justify-center">
  <div className="flex flex-1 flex-col items-center justify-start pt-16">
  <div className="flex flex-col items-center gap-4 rounded-3xl bg-purple-50 px-3 py-6">
    {navItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-slate-500 shadow-md transition hover:bg-purple-100 hover:text-purple-600"
      >
        <span aria-hidden>{item.icon}</span>
        <span className="sr-only">{item.label}</span>
      </a>
    ))}
  </div>
</div>
</nav>
    </aside>
  );
}