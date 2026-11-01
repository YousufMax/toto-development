'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarClock,
  Clock,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Power,
  X,
  Loader2,
  ShieldAlert,
  Moon,
  Sun,
  Activity,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

interface ScheduleSlot {
  id: number;
  agent_id: number;
  agent_name: string;
  phone_number: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  timezone: string;
  is_active: boolean;
  is_overnight: boolean;
  priority: number;
}

interface WhatsAppAgent {
  id: number;
  agent_name: string;
  phone_number: string;
}

export default function WhatsAppSchedulerPage() {
  const [schedules, setSchedules] = useState<ScheduleSlot[]>([]);
  const [agents, setAgents] = useState<WhatsAppAgent[]>([]);
  const [overrideState, setOverrideState] = useState<{
    enabled: boolean;
    agent_id: number | null;
  }>({ enabled: false, agent_id: null });
  const [dhakaTime, setDhakaTime] = useState<{
    timeStr: string;
    dayName: string;
    fullDateStr: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [agentId, setAgentId] = useState<number | ''>('');
  const [dayOfWeek, setDayOfWeek] = useState('all');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [isOvernight, setIsOvernight] = useState(false);
  const [priority, setPriority] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [conflictWarning, setConflictWarning] = useState('');

  const fetchSchedulerData = async () => {
    try {
      setIsLoading(true);
      const [schedRes, agentsRes] = await Promise.all([
        fetch('/api/admin/whatsapp/schedules/', { cache: 'no-store' }),
        fetch('/api/admin/whatsapp/agents/', { cache: 'no-store' }),
      ]);

      if (schedRes.ok) {
        const sData = await schedRes.json();
        setSchedules(sData.schedules || []);
        if (sData.manualOverride) setOverrideState(sData.manualOverride);
        if (sData.dhakaTime) setDhakaTime(sData.dhakaTime);
      }

      if (agentsRes.ok) {
        const aData = await agentsRes.json();
        setAgents(aData);
        if (aData.length > 0 && !agentId) {
          setAgentId(aData[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load scheduler data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedulerData();

    // Clock ticker every 15s
    const clockInterval = setInterval(() => {
      fetch('/api/whatsapp/active/')
        .then((r) => r.json())
        .then((d) => {
          if (d?.serverTimeDhaka) {
            setDhakaTime((prev) => (prev ? { ...prev, fullDateStr: d.serverTimeDhaka } : null));
          }
        })
        .catch(() => {});
    }, 15000);

    return () => clearInterval(clockInterval);
  }, []);

  const handleToggleOverride = async (enabled: boolean, agId?: number) => {
    const targetAgentId = agId || (agents.length > 0 ? agents[0].id : null);
    try {
      const res = await fetch('/api/admin/whatsapp/override/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled,
          agent_id: enabled ? targetAgentId : null,
        }),
      });

      if (res.ok) {
        setOverrideState({ enabled, agent_id: enabled ? targetAgentId : null });
        fetchSchedulerData();
      }
    } catch (e) {
      alert('Failed to update manual override');
    }
  };

  const handleSaveSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentId) {
      setErrorMsg('Please select a WhatsApp Agent.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');
    setConflictWarning('');

    try {
      const res = await fetch('/api/admin/whatsapp/schedules/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: agentId,
          day_of_week: dayOfWeek,
          start_time: startTime,
          end_time: endTime,
          is_overnight: isOvernight,
          priority,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save schedule slot');
      }

      if (data.warning) {
        setConflictWarning(data.warning);
      }

      setIsModalOpen(false);
      fetchSchedulerData();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSlot = async (id: number) => {
    if (!confirm('Are you sure you want to remove this shift slot?')) return;

    try {
      const res = await fetch(`/api/admin/whatsapp/schedules/${id}/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchSchedulerData();
      }
    } catch (e) {
      alert('Failed to delete shift');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber-glow text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <CalendarClock className="w-3.5 h-3.5 text-amber-400" />
            <span>TIME-SLOT ROUTING & SERVER-SIDE ROTATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-silver">
            WhatsApp Scheduling & Shift Rotation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure hourly shift coverage in Asia/Dhaka time. Calls and clicks rotate automatically without manual intervention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSchedulerData}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Live Sync</span>
          </button>

          <button
            onClick={() => {
              setErrorMsg('');
              setConflictWarning('');
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 font-bold text-black" />
            <span>Add Shift Slot</span>
          </button>
        </div>
      </div>

      {/* Real-time Dhaka Digital Clock & Override Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clock Card */}
        <div className="p-6 rounded-3xl admin-card-cyan rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-cyan-400 block mb-1 font-bold">
              ENGINE TIMEZONE: ASIA/DHAKA (UTC+6)
            </span>
            <div className="flex items-baseline gap-2.5">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <span className="num-tabular text-3xl sm:text-4xl font-extrabold text-white">
                {dhakaTime?.timeStr || 'Loading...'}
              </span>
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                {dhakaTime?.dayName}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-1">
              {dhakaTime?.fullDateStr}
            </p>
          </div>
        </div>

        {/* Manual Override Card */}
        <div className="p-6 rounded-3xl admin-card-amber rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-amber-400 flex items-center gap-1.5 font-bold">
              <Power className="w-3.5 h-3.5 text-amber-400" />
              <span>Emergency Manual Override</span>
            </span>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                overrideState.enabled
                  ? 'badge-rose-glow'
                  : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
              }`}
            >
              {overrideState.enabled ? 'OVERRIDE ON' : 'SCHEDULE DRIVEN'}
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Force all website traffic immediately to a single agent, temporarily bypassing schedule rules.
          </p>

          <div className="flex items-center gap-3">
            {overrideState.enabled ? (
              <button
                onClick={() => handleToggleOverride(false)}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer"
              >
                Disable Override (Resume Automatic Shift Rotation)
              </button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <select
                  id="overrideSelect"
                  className="px-3.5 py-2.5 rounded-xl bg-[#0b0e1c] border border-white/[0.1] text-xs text-white flex-1 focus:border-amber-400 focus:outline-none"
                >
                  {agents.map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.agent_name} ({ag.phone_number})
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    const el = document.getElementById('overrideSelect') as HTMLSelectElement;
                    if (el) handleToggleOverride(true, parseInt(el.value, 10));
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  Activate Override
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Shift Timeline Grid */}
      <div className="p-6 sm:p-7 rounded-3xl admin-glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Active Shift Schedule Timeline
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configured rotation blocks resolved dynamically by server on each request
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {schedules.length} active time blocks
          </span>
        </div>

        <div className="overflow-x-auto admin-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Time Slot</th>
                <th className="pb-3.5 font-bold">Coverage Window</th>
                <th className="pb-3.5 font-bold">Assigned Agent</th>
                <th className="pb-3.5 font-bold">Days Active</th>
                <th className="pb-3.5 font-bold">Type</th>
                <th className="pb-3.5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
                    <span>Loading shifts...</span>
                  </td>
                </tr>
              ) : schedules.length > 0 ? (
                schedules.map((sc) => {
                  const isCurrentTimeMatch =
                    dhakaTime &&
                    (!sc.is_overnight
                      ? dhakaTime.timeStr >= sc.start_time && dhakaTime.timeStr < sc.end_time
                      : dhakaTime.timeStr >= sc.start_time || dhakaTime.timeStr < sc.end_time);

                  return (
                    <tr
                      key={sc.id}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        isCurrentTimeMatch ? 'bg-emerald-500/[0.08] border-l-2 border-emerald-400' : ''
                      }`}
                    >
                      {/* Time slot */}
                      <td className="py-4 font-mono font-bold text-white text-sm">
                        <div className="flex items-center gap-2">
                          {isCurrentTimeMatch && (
                            <span className="relative flex h-2 w-2 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                          )}
                          <span className={isCurrentTimeMatch ? 'text-emerald-300' : 'text-white'}>
                            {sc.start_time} — {sc.end_time}
                          </span>
                        </div>
                      </td>

                      {/* Coverage window */}
                      <td className="py-4 text-slate-400 font-mono">
                        {isCurrentTimeMatch ? (
                          <span className="badge-emerald-glow px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase">
                            LIVE ON-DUTY NOW
                          </span>
                        ) : (
                          <span>Asia/Dhaka</span>
                        )}
                      </td>

                      {/* Assigned Agent */}
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                            <FaWhatsapp className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold text-white block">{sc.agent_name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{sc.phone_number}</span>
                          </div>
                        </div>
                      </td>

                      {/* Days active */}
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.05] text-slate-300 uppercase">
                          {sc.day_of_week === 'all' ? 'All Week (Mon-Sun)' : sc.day_of_week}
                        </span>
                      </td>

                      {/* Overnight / Standard */}
                      <td className="py-4">
                        {sc.is_overnight ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-md border border-purple-500/30">
                            <Moon className="w-3 h-3" />
                            <span>Overnight Shift</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30">
                            <Sun className="w-3 h-3" />
                            <span>Day Shift</span>
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleDeleteSlot(sc.id)}
                          className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                          title="Remove Shift Slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                    No shift blocks configured. Add a shift to enable automatic schedule rotation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD SHIFT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg admin-glass-card rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-white relative border border-emerald-500/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold mb-1 text-gradient-silver tracking-tight">
              Add New Shift Block
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Assign an agent to a specific time window in Asia/Dhaka timezone.
            </p>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSaveSlot} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Assigned WhatsApp Agent <span className="text-emerald-400">*</span>
                </label>
                <select
                  required
                  value={agentId}
                  onChange={(e) => setAgentId(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                >
                  <option value="">Select an Agent...</option>
                  {agents.map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.agent_name} ({ag.phone_number})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Start Time (HH:MM 24h)
                  </label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    End Time (HH:MM 24h)
                  </label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                  Days of Week
                </label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0d1020] border border-white/[0.1] focus:border-emerald-400 focus:outline-none text-white text-sm"
                >
                  <option value="all">Every Day (Mon - Sun)</option>
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                  <option value="sat">Saturday</option>
                  <option value="sun">Sunday</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOvernight}
                    onChange={(e) => setIsOvernight(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Overnight shift (crosses midnight, e.g. 21:00 to 02:00)</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : null}
                  <span>Add to Shift Rotation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}