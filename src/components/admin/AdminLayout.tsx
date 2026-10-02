import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Award, 
  Activity, 
  Briefcase, 
  Mail, 
  Bell, 
  Image as ImageIcon, 
  FileText, 
  Shield, 
  History, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Keyboard,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  adminUser: any;
  onAdminLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  currentPath, 
  onNavigate, 
  adminUser, 
  onAdminLogout, 
  children 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/students', label: 'Students', icon: Users },
    { path: '/admin/courses', label: 'Courses', icon: BookOpen },
    { path: '/admin/results', label: 'Results', icon: Award },
    { path: '/admin/certificates', label: 'Certificates', icon: FileText },
    { path: '/admin/typing-tests', label: 'Typing Tests', icon: Activity },
    { path: '/admin/work-from-home', label: 'Work From Home', icon: Briefcase },
    { path: '/admin/enquiries', label: 'Enquiries', icon: Mail },
    { path: '/admin/announcements', label: 'Announcements', icon: Bell },
    { path: '/admin/media', label: 'Media Library', icon: ImageIcon },
    { path: '/admin/content', label: 'Website Content', icon: FileText },
    { path: '/admin/users', label: 'Admin Users', icon: Shield },
    { path: '/admin/logs', label: 'Activity Logs', icon: History },
    { path: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white shadow-lg">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-base tracking-tight leading-tight">
                GTC <span className="text-blue-400">ADMIN</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Management Console</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow overflow-y-auto px-4 py-6 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </button>
            );
          })}
        </div>

        {/* Bottom Profile & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/50">
          <button 
            onClick={() => handleNav('/')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span>View Public Website</span>
          </button>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-white text-xs font-bold truncate">{adminUser?.name || 'Administrator'}</h4>
                <p className="text-[10px] text-blue-400 font-semibold">{adminUser?.role || 'Super Admin'}</p>
              </div>
            </div>
            <button
              onClick={onAdminLogout}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Google Typing Classes • Admin Dashboard
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Tripolia Kathak, Patna, Bihar – 800007</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live System CMS</span>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-grow p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
