import React, { useState, useEffect } from 'react';
import { Package, Search, Settings } from 'lucide-react';
import { cn } from '@/src/utils/cn';

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

export default MasterData;
