import React from 'react';
import { cn } from '@/src/utils/cn';

export const StatCard = ({ label, value, trend, icon: Icon }: { label: string, value: string, trend?: string, icon: any }) => (
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
