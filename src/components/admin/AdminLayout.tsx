import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Home, Briefcase, Award, FileText, Lightbulb, Users2, GraduationCap, LogOut, Settings as SettingsIcon } from 'lucide-react';

const navItems = [
  { name: 'Overview', path: '/randi/dashboard', icon: LayoutDashboard },
  { name: 'Edit Home', path: '/randi/dashboard/home', icon: Home },
  { name: 'Pengalaman', path: '/randi/dashboard/experiences', icon: Briefcase },
  { name: 'Proyek', path: '/randi/dashboard/projects', icon: Award },
  { name: 'Publikasi', path: '/randi/dashboard/publications', icon: FileText },
  { name: 'Riset', path: '/randi/dashboard/research', icon: Lightbulb },
  { name: 'Layanan', path: '/randi/dashboard/services', icon: Users2 },
  { name: 'Pengajaran', path: '/randi/dashboard/teaching', icon: GraduationCap },
  { name: 'Pengaturan', path: '/randi/dashboard/settings', icon: SettingsIcon },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center px-6 border-b border-slate-200">
          <span className="text-lg font-semibold">CMS Panel</span>
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
