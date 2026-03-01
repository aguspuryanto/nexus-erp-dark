import React, { useState, useEffect } from 'react';
import { Globe, ChevronRight } from 'lucide-react';

const CMS = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/cms/posts').then(res => res.json()).then(setPosts);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-zinc-500">Manage your landing page and corporate blog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors">
            Page Builder
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-colors">
            New Blog Post
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="font-bold mb-4">Recent Blog Posts</h3>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-bold text-sm">{post.title}</h4>
                    <p className="text-xs text-zinc-400">By {post.author} • {post.date}</p>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
            <h3 className="font-bold mb-4">Landing Page Status</h3>
            <div className="aspect-video bg-zinc-100 rounded-xl mb-4 flex items-center justify-center border border-zinc-200 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg">Edit Page</button>
              </div>
              <Globe size={32} className="text-zinc-300" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">Last updated</span>
              <span className="text-sm font-bold">2 days ago</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-zinc-500">Status</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMS;
