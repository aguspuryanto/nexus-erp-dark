import React, { useState, useEffect } from 'react';

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

export default Inventory;
