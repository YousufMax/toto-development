'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Loader2, AlertCircle, Database } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@totodev.com');
  const [password, setPassword] = useState('admin123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if already logged in
  useEffect(() => {
    fetch('/api/auth/me/')
      .then((res) => {
        if (res.ok) {
          router.replace('/admin');
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full admin-canvas-bg text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      {/* Ambient Cosmic Radial Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-indigo-600/15 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute -bottom-20 right-1/4 w-[500px] h-[400px] bg-emerald-500/12 blur-[150px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-emerald-glow text-xs font-mono font-bold tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>TOTO AGENCY OPERATIONS CLOUD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-silver">
            Super Admin Portal
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Centralized agency operations, WhatsApp routing & CRM
          </p>
        </div>

        {/* Login Card */}
        <div className="admin-glass-card rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative border border-white/[0.08]">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs leading-relaxed animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold">
                ADMIN EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@totodev.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 focus:outline-none text-white text-sm placeholder:text-slate-600 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold">
                SECURITY PASSPHRASE
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 focus:outline-none text-white text-sm placeholder:text-slate-600 transition-all font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 text-black font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all active:scale-98 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Agency Command</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>

          {/* Preset Credentials Hint for Easy Testing */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Demo: <strong className="text-slate-200">admin@totodev.com</strong></span>
            <span>Pass: <strong className="text-slate-200">admin123456</strong></span>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2 font-mono">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>Role-Based Access Control • PostgreSQL 18 Protected</span>
        </div>
      </div>
    </div>
  );
}