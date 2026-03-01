import React, { useState, useEffect } from 'react';

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

export default Accounting;
