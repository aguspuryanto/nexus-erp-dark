import React, { useState, useEffect } from 'react';
import { cn } from '@/src/utils/cn';

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

export default Purchasing;
