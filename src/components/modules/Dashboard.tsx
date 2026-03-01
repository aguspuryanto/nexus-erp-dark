import React, { useState, useEffect } from 'react';
import { TrendingUp, ShoppingCart, Warehouse, Target, Package } from 'lucide-react';
import { StatCard } from '@/src/components/ui/StatCard';

const Dashboard = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/audit-logs').then(res => res.json()).then(setLogs);
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500">Welcome back, here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Sales" value="Rp 125.4M" trend="+12.5%" icon={TrendingUp} />
        <StatCard label="Purchases" value="Rp 84.2M" trend="-2.4%" icon={ShoppingCart} />
        <StatCard label="Inventory Value" value="Rp 450.8M" icon={Warehouse} />
        <StatCard label="Active Leads" value="42" trend="+5" icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-100">
                    <Package size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Sale Order #SO-2024-00{i}</p>
                    <p className="text-xs text-zinc-500">Customer: Global Tech Solutions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">Rp 12.500.000</p>
                  <p className="text-xs text-emerald-600 font-medium">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Inventory Alerts</h3>
            <div className="space-y-4">
              {['MacBook Air M2', 'Dell XPS 15', 'Logitech MX Master 3'].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 border-b border-zinc-50 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div>
                    <p className="text-sm font-medium">{item}</p>
                    <p className="text-xs text-zinc-400">Low stock: 2 units left</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors">
              View All Alerts
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Activity Log</h3>
            <div className="space-y-4">
              {logs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex gap-3">
                  <div className="w-1 h-full bg-zinc-100 rounded-full" />
                  <div>
                    <p className="text-xs font-bold">{log.action}</p>
                    <p className="text-[10px] text-zinc-400">{log.module} • {log.created_at}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
