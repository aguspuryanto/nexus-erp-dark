import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  Navigate
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
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
  X,
  ChevronRight,
  Search,
  Bell,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

const StatCard = ({ label, value, trend, icon: Icon }: { label: string, value: string, trend?: string, icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-50 rounded-xl">
        <Icon size={24} className="text-zinc-600" />
      </div>
      {trend && (
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-zinc-500 text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold mt-1 tracking-tight">{value}</h3>
  </div>
);

// --- Pages ---

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

const MasterData = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Master Data</h1>
          <p className="text-zinc-500">Manage your products, customers, and suppliers.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2">
          <Package size={18} />
          Add New Product
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Categories</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Low Stock Items</h3>
          <p className="text-3xl font-bold text-rose-600">3</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <h3 className="font-bold">Product Catalog</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400"><Search size={18} /></button>
            <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400"><Settings size={18} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-zinc-400">Loading products...</td>
                </tr>
              ) : products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-sm text-zinc-500">{p.code}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm">{p.name}</div>
                    <div className="text-xs text-zinc-400">{p.unit}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{p.category}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold">Rp {p.sale_price.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-400">Cost: Rp {p.purchase_price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "text-sm font-bold",
                      p.stock_level < 5 ? "text-rose-600" : "text-zinc-900"
                    )}>
                      {p.stock_level}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Accounting = () => {
  const [coa, setCoa] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/coa')
      .then(res => res.json())
      .then(data => {
        setCoa(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-zinc-500">Chart of Accounts and Financial Statements.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors">
            General Ledger
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
            New Journal Entry
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Assets', 'Liabilities', 'Equity', 'Revenue'].map((type) => (
          <div key={type} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">{type}</h3>
            <p className="text-2xl font-bold">Rp {(Math.random() * 1000000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h3 className="font-bold">Chart of Accounts</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Code</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Account Name</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {coa.map((account) => (
              <tr key={account.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-zinc-500">{account.code}</td>
                <td className="px-6 py-4 font-bold text-sm">{account.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-full uppercase">{account.type}</span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-sm">Rp {account.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CRM = () => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/crm/leads').then(res => res.json()).then(setLeads);
  }, []);

  const stages = ['Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM Pipeline</h1>
          <p className="text-zinc-500">Track your sales opportunities and leads.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          New Opportunity
        </button>
      </header>

      <div className="flex gap-6 overflow-x-auto pb-6">
        {stages.map((stage) => (
          <div key={stage} className="flex-shrink-0 w-80 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-sm flex items-center gap-2">
                {stage}
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] rounded-full">
                  {leads.filter(l => l.stage === stage).length}
                </span>
              </h3>
              <button className="p-1 hover:bg-zinc-100 rounded text-zinc-400"><X size={14} /></button>
            </div>
            
            <div className="space-y-3">
              {leads.filter(l => l.stage === stage).map((lead) => (
                <div key={lead.id} className="bg-white p-4 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-sm">{lead.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {lead.probability}%
                    </span>
                  </div>
                  <p className="text-lg font-bold mb-4">Rp {lead.value.toLocaleString()}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Updated 2h ago</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border-2 border-dashed border-zinc-200 rounded-xl text-zinc-400 text-xs font-bold hover:border-zinc-300 hover:text-zinc-500 transition-all">
                + Add Lead
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Purchasing = () => {
  const [pos, setPos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/purchasing').then(res => res.json()).then(setPos);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchasing</h1>
          <p className="text-zinc-500">Manage purchase requests and orders.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          Create Purchase Order
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">PO Number</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {pos.map((po) => (
              <tr key={po.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-bold">{po.po_number}</td>
                <td className="px-6 py-4 text-sm">{po.supplier_name}</td>
                <td className="px-6 py-4 text-sm text-zinc-500">{po.created_at}</td>
                <td className="px-6 py-4 font-bold text-sm">Rp {po.total_amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded-full uppercase",
                    po.status === 'Ordered' ? "bg-blue-50 text-blue-600" : "bg-zinc-100 text-zinc-600"
                  )}>
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Sales = () => {
  const [sos, setSos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/sales').then(res => res.json()).then(setSos);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-zinc-500">Quotations, Sale Orders, and Invoicing.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          New Quotation
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">SO Number</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {sos.map((so) => (
              <tr key={so.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-bold">{so.so_number}</td>
                <td className="px-6 py-4 text-sm">{so.customer_name}</td>
                <td className="px-6 py-4 font-bold text-sm">Rp {so.total_amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded-full uppercase",
                    so.status === 'Quotation' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {so.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-400 hover:text-black">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Inventory = () => {
  const [transfers, setTransfers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/inventory/transfers').then(res => res.json()).then(setTransfers);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-zinc-500">Stock management and warehouse transfers.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          New Transfer
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Total Warehouses</h3>
          <p className="text-3xl font-bold">4</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Stock Value</h3>
          <p className="text-3xl font-bold">Rp 450.8M</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Pending Transfers</h3>
          <p className="text-3xl font-bold text-blue-600">2</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h3 className="font-bold">Recent Stock Transfers</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Item</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">From</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">To</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Qty</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {transfers.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-sm">{t.item}</td>
                <td className="px-6 py-4 text-sm">{t.from}</td>
                <td className="px-6 py-4 text-sm">{t.to}</td>
                <td className="px-6 py-4 font-mono text-sm">{t.qty}</td>
                <td className="px-6 py-4 text-sm text-zinc-500">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Finance = () => {
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/finance/transactions').then(res => res.json()).then(setTxs);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-zinc-500">Cash, Bank, and Payment management.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          Record Payment
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h3 className="font-bold">Recent Cash/Bank Transactions</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Account</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {txs.map((tx) => (
              <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-zinc-500">{tx.date}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-sm">{tx.description}</div>
                  <div className={cn(
                    "text-[10px] font-bold uppercase",
                    tx.type === 'Income' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {tx.type}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{tx.account}</td>
                <td className={cn(
                  "px-6 py-4 text-right font-bold text-sm",
                  tx.type === 'Income' ? "text-emerald-600" : "text-rose-600"
                )}>
                  {tx.type === 'Income' ? '+' : '-'} Rp {tx.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HRD = () => {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/employees').then(res => res.json()).then(setEmployees);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Human Resources</h1>
          <p className="text-zinc-500">Manage employee data, payroll, and attendance.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2">
          <UserCheck size={18} />
          Add Employee
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Position</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {employees.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-zinc-400">No employees found.</td></tr>
            ) : employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-sm">{emp.full_name}</div>
                  <div className="text-xs text-zinc-400">Joined {emp.join_date}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{emp.position}</td>
                <td className="px-6 py-4 text-sm text-zinc-500">{emp.department}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">{emp.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-400 hover:text-black transition-colors"><ChevronRight size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Recruitment = () => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/recruitment/jobs').then(res => res.json()).then(setJobs);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
          <p className="text-zinc-500">Job postings, applications, and hiring pipeline.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          Post New Job
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-zinc-500">{job.department}</p>
              </div>
              <span className={cn(
                "px-2 py-1 text-[10px] font-bold rounded-full uppercase",
                job.status === 'Open' ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
              )}>
                {job.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-zinc-400" />
                <span className="text-sm font-bold">{job.applicants} Applicants</span>
              </div>
              <button className="text-sm font-bold text-zinc-900 hover:underline">View Pipeline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuditTrail = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/audit-logs').then(res => res.json()).then(setLogs);
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
        <p className="text-zinc-500">System activity log and security monitoring.</p>
      </header>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Module</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {logs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-zinc-400">No activity logs found.</td></tr>
            ) : logs.map((log) => (
              <tr key={log.id} className="text-sm">
                <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{log.created_at}</td>
                <td className="px-6 py-4 font-bold">{log.user_name || 'System'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-zinc-100 rounded text-[10px] font-bold uppercase">{log.action}</span>
                </td>
                <td className="px-6 py-4 text-zinc-600">{log.module}</td>
                <td className="px-6 py-4 text-zinc-400 truncate max-w-xs">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CMS = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/cms/posts').then(res => res.json()).then(setPosts);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-zinc-500">Manage your landing page and corporate blog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors">
            Page Builder
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
            New Blog Post
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="font-bold mb-4">Recent Blog Posts</h3>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-bold text-sm">{post.title}</h4>
                    <p className="text-xs text-zinc-400">By {post.author} • {post.date}</p>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="font-bold mb-4">Landing Page Status</h3>
            <div className="aspect-video bg-zinc-100 rounded-xl mb-4 flex items-center justify-center border border-zinc-200 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg">Edit Page</button>
              </div>
              <Globe size={32} className="text-zinc-300" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">Last updated</span>
              <span className="text-sm font-bold">2 days ago</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-zinc-500">Status</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        </div>
      </main>
    </div>
  );
}
