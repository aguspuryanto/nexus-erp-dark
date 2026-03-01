import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

export default CRM;
