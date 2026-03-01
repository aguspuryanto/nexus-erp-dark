import React, { useState, useEffect } from 'react';
import { cn } from '@/src/utils/cn';

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

export default Sales;
