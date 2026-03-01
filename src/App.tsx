import React, { useState, lazy, Suspense } from 'react';
import { 
  Routes, 
  Route, 
  Link, 
  useLocation,
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Warehouse, 
  BookOpen, 
  Wallet, 
  UserCheck, 
  Briefcase, 
  Target, 
  Globe, 
  Settings, 
  LogOut,
  Menu,
  Search,
  Bell,
  User,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/utils/cn';

// --- Lazy Loaded Modules ---
const Dashboard = lazy(() => import('./components/modules/Dashboard'));
const MasterData = lazy(() => import('./components/modules/MasterData'));
const Purchasing = lazy(() => import('./components/modules/Purchasing'));
const Sales = lazy(() => import('./components/modules/Sales'));
const Inventory = lazy(() => import('./components/modules/Inventory'));
const Accounting = lazy(() => import('./components/modules/Accounting'));
const CRM = lazy(() => import('./components/modules/CRM'));
const HRD = lazy(() => import('./components/modules/HRD'));
const Finance = lazy(() => import('./components/modules/Finance'));
const Recruitment = lazy(() => import('./components/modules/Recruitment'));
const CMS = lazy(() => import('./components/modules/CMS'));
const AuditTrail = lazy(() => import('./components/modules/AuditTrail'));

// --- Components ---

const SidebarItem = ({ icon: Icon, label, to, active }: { icon: any, label: string, to: string, active: boolean }) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-white text-black shadow-sm" 
        : "text-zinc-400 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon size={20} className={cn(active ? "text-black" : "text-zinc-400 group-hover:text-white")} />
    <span className="font-medium text-sm">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />}
  </Link>
);

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
    <Loader2 size={48} className="text-zinc-300 animate-spin" />
    <p className="text-zinc-500 font-medium">Loading module...</p>
  </div>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
    <div className="p-6 bg-zinc-50 rounded-full">
      <Settings size={48} className="text-zinc-300 animate-spin-slow" />
    </div>
    <h1 className="text-2xl font-bold tracking-tight">{title} Module</h1>
    <p className="text-zinc-500 max-w-md text-center">
      This module is currently being initialized. Please check back shortly for full functionality.
    </p>
  </div>
);

// --- Layout ---

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Package, label: 'Master Data', to: '/master' },
    { icon: ShoppingCart, label: 'Purchasing', to: '/purchasing' },
    { icon: TrendingUp, label: 'Sales', to: '/sales' },
    { icon: Warehouse, label: 'Inventory', to: '/inventory' },
    { icon: BookOpen, label: 'Accounting', to: '/accounting' },
    { icon: Wallet, label: 'Finance', to: '/finance' },
    { icon: UserCheck, label: 'HRD', to: '/hrd' },
    { icon: Briefcase, label: 'Recruitment', to: '/recruitment' },
    { icon: Target, label: 'CRM', to: '/crm' },
    { icon: Globe, label: 'CMS', to: '/cms' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-zinc-900 font-sans flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-[#141414] transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">N</span>
            </div>
            {isSidebarOpen && <span className="text-white font-bold text-xl tracking-tight">Nexus ERP</span>}
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.to}
                icon={item.icon}
                label={isSidebarOpen ? item.label : ''}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-800 space-y-1">
            <SidebarItem icon={Settings} label={isSidebarOpen ? 'Settings' : ''} to="/settings" active={location.pathname === '/settings'} />
            <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-zinc-600" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-zinc-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-100 rounded-lg relative">
              <Bell size={20} className="text-zinc-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-zinc-100 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Administrator</p>
                <p className="text-xs text-zinc-500 mt-1">Headquarters</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                <User size={20} className="text-zinc-600" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/master" element={<MasterData />} />
                  <Route path="/purchasing" element={<Purchasing />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/crm" element={<CRM />} />
                  <Route path="/hrd" element={<HRD />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/recruitment" element={<Recruitment />} />
                  <Route path="/cms" element={<CMS />} />
                  <Route path="/settings" element={<AuditTrail />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
