import React, { useState, useEffect } from 'react';
import { UserCheck, ChevronRight } from 'lucide-react';

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

export default HRD;
