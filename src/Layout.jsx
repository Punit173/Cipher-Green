import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, LayoutDashboard, ScanLine, BarChart3, Info } from 'lucide-react';
import FloatingScanButton from './components/FloatingScanButton';

export default function Layout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/Home';

  if (isLanding) {
    return (
      <div className="min-h-screen flex flex-col relative text-slate-50 bg-[#0f172a]">
        <header className="fixed w-full top-0 z-50 glass-card border-b-0 py-4 px-6 sm:px-12 flex justify-between items-center">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <ScanLine className="w-8 h-8 text-[#00C853]" />
            <span className="text-xl font-bold tracking-tight text-white">Ciphera<span className="text-[#00C853]">Green</span></span>
          </Link>
          <nav className="hidden sm:flex gap-8">
            <Link to={createPageUrl('Dashboard')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
            <Link to={createPageUrl('Scanner')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Scanner</Link>
            <Link to={createPageUrl('Analytics')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Analytics</Link>
            <Link to={createPageUrl('About')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
          </nav>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-slate-50">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 flex flex-col ml-0 sm:ml-64 transition-all duration-300 relative">
        <main className="flex-1 p-6 sm:p-10 pb-24">
          {children}
        </main>
        <FloatingScanButton />
      </div>
    </div>
  );
}

function Sidebar({ currentPath }) {
  const navItems = [
    { name: 'Dashboard', path: 'Dashboard', icon: LayoutDashboard },
    { name: 'AI Scanner', path: 'Scanner', icon: ScanLine },
    { name: 'Analytics', path: 'Analytics', icon: BarChart3 },
    { name: 'About', path: 'About', icon: Info },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 glass-card border-r border-slate-700/50 hidden sm:flex flex-col z-40">
      <div className="p-6">
        <Link to={createPageUrl('Home')} className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#00C853] to-[#22d3ee] rounded-xl">
            <ScanLine className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Ciphera<span className="text-[#00C853]">Green</span></span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = currentPath.includes(item.path);
          return (
            <Link
              key={item.name}
              to={createPageUrl(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-[#00C853]/20 to-transparent text-[#00C853] border border-[#00C853]/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-[#00C853]' : ''}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-700/50">
        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00C853] to-[#22d3ee] flex items-center justify-center font-bold text-white">
            U
          </div>
          <div>
            <p className="text-sm font-semibold">User</p>
            <p className="text-xs text-slate-400">Eco Warrior</p>
          </div>
        </div>
      </div>
    </div>
  );
}