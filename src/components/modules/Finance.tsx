import React, { useState, useEffect } from 'react';
import { cn } from '@/src/utils/cn';

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

export default Finance;
