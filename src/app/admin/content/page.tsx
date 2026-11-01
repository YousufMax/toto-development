'use client';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Edit2,
  CheckCircle2,
  RefreshCw,
  Save,
  Loader2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ContentBlock {
  id: number;
  section_key: string;
  section_group: string;
  title?: string;
  content_value: string;
  is_published: boolean;
  updated_at: string;
}

export default function WebsiteContentManagerPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/content/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setBlocks(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleStartEdit = (b: ContentBlock) => {
    setEditingKey(b.section_key);
    setEditValue(b.content_value);
    setStatusMsg('');
  };

  const handleSaveBlock = async (b: ContentBlock) => {
    setIsSaving(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/admin/content/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: b.section_key,
          section_group: b.section_group,
          title: b.title,
          content_value: editValue,
          is_published: true,
        }),
      });

      if (res.ok) {
        setStatusMsg(`Saved "${b.title || b.section_key}" successfully.`);
        setEditingKey(null);
        fetchContent();
      } else {
        alert('Failed to save content block');
      }
    } catch (e) {
      alert('Error updating content');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>LIVE HEADLESS CONTENT MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            Website Content Manager (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Update hero headlines, promotional announcement banners, and contact information without editing code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchContent}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh</span>
          </button>

          <a
            href="/"
            target="_blank"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-black" />
            <span>Live Flagship Preview</span>
          </a>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Content Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 py-20 text-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
            <span className="font-mono text-xs">Loading CMS blocks...</span>
          </div>
        ) : (
          blocks.map((block) => {
            const isEditing = editingKey === block.section_key;

            return (
              <div
                key={block.id}
                className="p-6 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/25 font-bold">
                      {block.section_group} • {block.section_key}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Updated: {new Date(block.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white mb-3 tracking-tight">
                    {block.title || block.section_key}
                  </h3>

                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-black/40 border border-emerald-400/50 focus:outline-none text-white text-xs leading-relaxed font-sans"
                    />
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/[0.05] font-sans">
                      {block.content_value}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setEditingKey(null)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveBlock(block)}
                        disabled={isSaving}
                        className="px-5 py-2 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.35)] cursor-pointer"
                      >
                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin text-black" /> : null}
                        <span>Save & Publish</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleStartEdit(block)}
                      className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}