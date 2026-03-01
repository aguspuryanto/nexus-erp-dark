import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const Recruitment = () => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/recruitment/jobs').then(res => res.json()).then(setJobs);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
          <p className="text-zinc-500">Job postings, applications, and hiring pipeline.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
          Post New Job
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-zinc-500">{job.department}</p>
              </div>
              <span className={cn(
                "px-2 py-1 text-[10px] font-bold rounded-full uppercase",
                job.status === 'Open' ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
              )}>
                {job.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-zinc-400" />
                <span className="text-sm font-bold">{job.applicants} Applicants</span>
              </div>
              <button className="text-sm font-bold text-zinc-900 hover:underline">View Pipeline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;
