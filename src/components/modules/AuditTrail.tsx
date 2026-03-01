import React, { useState, useEffect } from 'react';

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

export default AuditTrail;
