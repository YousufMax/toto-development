'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Key,
  Server,
  Loader2,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings/')
      .then((res) => res.json())
      .then((data) => {
        if (data?.currentUser) {
          setCurrentUser(data.currentUser);
          setName(data.currentUser.name || '');
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setStatusMsg('');

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch('/api/admin/settings/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          current_password: currentPassword || undefined,
          new_password: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setStatusMsg('Account profile & security updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5 text-cyan-400" />
          <span>SECURITY & SYSTEM CREDENTIALS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
          Admin Settings & Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage super admin credentials, change master passwords, and inspect database connectivity.
        </p>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Profile & Password Form */}
      <div className="p-6 sm:p-8 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <h3 className="text-base font-extrabold text-white mb-6 flex items-center gap-2 tracking-tight">
          <User className="w-4 h-4 text-emerald-400" />
          <span>Admin Profile & Security Passphrase</span>
        </h3>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                ADMIN FULL NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                EMAIL ADDRESS (PRIMARY LOGIN)
              </label>
              <input
                type="email"
                disabled
                value={currentUser?.email || 'admin@totodev.com'}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/[0.05] text-slate-500 text-sm cursor-not-allowed font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Change Password (Leave blank to keep current)</span>
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Current Master Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm matching password"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : null}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* System Architecture Telemetry Card */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2 tracking-tight">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Database & Environment Telemetry</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
            <span className="text-slate-500 block mb-1">Database Engine:</span>
            <span className="text-emerald-400 font-bold text-sm">PostgreSQL 18</span>
            <span className="text-[10px] text-slate-400 block mt-1">Host: localhost:5432</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
            <span className="text-slate-500 block mb-1">Source of Truth:</span>
            <span className="text-white font-bold text-sm">toto_agency</span>
            <span className="text-[10px] text-emerald-400 block mt-1 font-bold">● Connected & Healthy</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
            <span className="text-slate-500 block mb-1">Session Security:</span>
            <span className="text-white font-bold text-sm">JWT (7 Days)</span>
            <span className="text-[10px] text-slate-400 block mt-1">HTTP-Only SameSite</span>
          </div>
        </div>
      </div>
    </div>
  );
}