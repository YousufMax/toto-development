'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Send,
  RefreshCw,
  Sliders,
  ExternalLink,
  Code2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { FaFacebook, FaGoogle, FaWhatsapp } from 'react-icons/fa6';

interface Integration {
  id: number;
  platform: string;
  name: string;
  is_enabled: boolean;
  status: 'active' | 'paused' | 'unconfigured' | 'error';
  config: Record<string, any>;
  last_event_at: string | null;
  last_success_at: string | null;
  last_error_at: string | null;
  last_error_message: string | null;
  events_count_30d: number;
}

interface EventLog {
  id: number;
  integration_name: string;
  platform: string;
  event_name: string;
  event_id: string | null;
  status: 'delivered' | 'failed' | 'skipped';
  http_status: number | null;
  response_body: string | null;
  error_message: string | null;
  created_at: string;
}

export default function MarketingIntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [recentLogs, setRecentLogs] = useState<EventLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<number | null>(null);
  const [testingPlatform, setTestingPlatform] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{
    platform: string;
    success: boolean;
    message: string;
  } | null>(null);

  // Password / Secret reveal state
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});

  const toggleReveal = (key: string) => {
    setShowSecret((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fetchIntegrations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/marketing/');
      if (res.ok) {
        const data = await res.json();
        setIntegrations(data.integrations || []);
        setRecentLogs(data.recentLogs || []);
      }
    } catch (e) {
      console.error('Error loading marketing integrations:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleConfigChange = (id: number, key: string, value: any) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            config: {
              ...(item.config || {}),
              [key]: value,
            },
          };
        }
        return item;
      })
    );
  };

  const handleToggleEnabled = (id: number, checked: boolean) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_enabled: checked } : item))
    );
  };

  const handleSaveIntegration = async (integration: Integration) => {
    setIsSaving(integration.id);
    try {
      const res = await fetch('/api/admin/marketing/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: integration.id,
          is_enabled: integration.is_enabled,
          config: integration.config,
        }),
      });

      if (res.ok) {
        await fetchIntegrations();
      }
    } catch (e) {
      console.error('Error saving integration:', e);
    } finally {
      setIsSaving(null);
    }
  };

  const handleTestConnection = async (integration: Integration) => {
    setTestingPlatform(integration.platform);
    setTestResult(null);

    try {
      const res = await fetch('/api/admin/marketing/test/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: integration.platform,
          config: integration.config || {},
        }),
      });

      const data = await res.json();
      setTestResult({
        platform: integration.platform,
        success: data.success,
        message: data.message || (data.success ? 'Connected successfully!' : 'Connection failed.'),
      });

      // Refresh integration status
      await fetchIntegrations();
    } catch (err: any) {
      setTestResult({
        platform: integration.platform,
        success: false,
        message: err.message || 'Network error reaching test server.',
      });
    } finally {
      setTestingPlatform(null);
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('meta')) return <FaFacebook className="w-5 h-5 text-blue-500" />;
    if (platform.includes('ga4') || platform.includes('gtm') || platform.includes('google'))
      return <FaGoogle className="w-5 h-5 text-amber-500" />;
    if (platform.includes('whatsapp')) return <FaWhatsapp className="w-5 h-5 text-emerald-400" />;
    return <Zap className="w-5 h-5 text-purple-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00FC43]/15 text-[#00FC43] border border-[#00FC43]/30">
              Growth Architecture
            </span>
            <span className="text-xs text-neutral-400">Marketing & Analytics Gateways</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Marketing Integrations Center
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure Meta CAPI with deduplication, Google Analytics 4, Tag Manager, and Custom Webhooks.
          </p>
        </div>

        <button
          onClick={fetchIntegrations}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Global Status Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="text-xs text-neutral-400">Active Gateways</div>
          <div className="text-2xl font-bold font-mono text-[#00FC43]">
            {integrations.filter((i) => i.is_enabled && i.status === 'active').length} / {integrations.length}
          </div>
          <div className="text-[11px] text-neutral-500">Live event dispatchers</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="text-xs text-neutral-400">Total Events Dispatched (30d)</div>
          <div className="text-2xl font-bold font-mono text-white">
            {integrations.reduce((acc, curr) => acc + (curr.events_count_30d || 0), 0)}
          </div>
          <div className="text-[11px] text-neutral-500">Server & browser combined</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080d09] border border-white/5 space-y-1">
          <div className="text-xs text-neutral-400">Event Deduplication</div>
          <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Active (Unified UUID v4)
          </div>
          <div className="text-[11px] text-neutral-500">Zero double-counting on Meta Pixel/CAPI</div>
        </div>
      </div>

      {/* Test feedback toast */}
      {testResult && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 text-xs leading-relaxed ${
            testResult.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>
              <strong>[{testResult.platform.toUpperCase()} Test]:</strong> {testResult.message}
            </span>
          </div>
          <button
            onClick={() => setTestResult(null)}
            className="text-neutral-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Integrations Grid */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center text-neutral-400 space-y-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#00FC43]" />
          <span className="text-xs">Loading integration configurations...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations.map((item) => {
            const config = item.config || {};
            const isSavingThis = isSaving === item.id;
            const isTestingThis = testingPlatform === item.platform;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#080d09] border border-white/10 space-y-4 shadow-xl"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {getPlatformIcon(item.platform)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                        {item.name}
                        {item.status === 'active' && item.is_enabled ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        ) : item.status === 'error' ? (
                          <span className="w-2 h-2 rounded-full bg-red-400" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-neutral-600" />
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                        <span className="capitalize">{item.status}</span>
                        <span>•</span>
                        <span>{item.events_count_30d || 0} events dispatched</span>
                      </div>
                    </div>
                  </div>

                  {/* Enable Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.is_enabled}
                      onChange={(e) => handleToggleEnabled(item.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FC43]"></div>
                  </label>
                </div>

                {/* Form Fields according to platform */}
                <div className="space-y-3 text-xs">
                  {item.platform === 'meta_pixel' && (
                    <>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Meta Pixel ID
                        </label>
                        <input
                          type="text"
                          value={config.pixel_id || ''}
                          onChange={(e) => handleConfigChange(item.id, 'pixel_id', e.target.value)}
                          placeholder="e.g. 1234567890123456"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 space-y-1">
                        <span className="font-semibold text-white block">Automatic Injection</span>
                        Browser script injects with matching eventID when enabled for deduplication with CAPI.
                      </div>
                    </>
                  )}

                  {item.platform === 'meta_capi' && (
                    <>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Pixel ID (Matches Browser Pixel)
                        </label>
                        <input
                          type="text"
                          value={config.pixel_id || ''}
                          onChange={(e) => handleConfigChange(item.id, 'pixel_id', e.target.value)}
                          placeholder="e.g. 1234567890123456"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          System User Access Token
                        </label>
                        <div className="relative">
                          <input
                            type={showSecret['meta_token'] ? 'text' : 'password'}
                            value={config.access_token || ''}
                            onChange={(e) => handleConfigChange(item.id, 'access_token', e.target.value)}
                            placeholder="EAAGm..."
                            className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => toggleReveal('meta_token')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                          >
                            {showSecret['meta_token'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Test Event Code <span className="text-neutral-500">(Optional for Events Manager)</span>
                        </label>
                        <input
                          type="text"
                          value={config.test_event_code || ''}
                          onChange={(e) => handleConfigChange(item.id, 'test_event_code', e.target.value)}
                          placeholder="e.g. TEST12345"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono uppercase"
                        />
                      </div>
                    </>
                  )}

                  {item.platform === 'ga4' && (
                    <>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Measurement ID
                        </label>
                        <input
                          type="text"
                          value={config.measurement_id || ''}
                          onChange={(e) => handleConfigChange(item.id, 'measurement_id', e.target.value)}
                          placeholder="G-XXXXXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Measurement Protocol API Secret
                        </label>
                        <div className="relative">
                          <input
                            type={showSecret['ga4_secret'] ? 'text' : 'password'}
                            value={config.api_secret || ''}
                            onChange={(e) => handleConfigChange(item.id, 'api_secret', e.target.value)}
                            placeholder="Generated in GA4 Admin > Data Streams"
                            className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => toggleReveal('ga4_secret')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                          >
                            {showSecret['ga4_secret'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {item.platform === 'gtm' && (
                    <div>
                      <label className="block font-medium text-neutral-300 mb-1">
                        GTM Container ID
                      </label>
                      <input
                        type="text"
                        value={config.container_id || ''}
                        onChange={(e) => handleConfigChange(item.id, 'container_id', e.target.value)}
                        placeholder="GTM-XXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                      />
                    </div>
                  )}

                  {item.platform === 'google_ads' && (
                    <>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Conversion ID
                        </label>
                        <input
                          type="text"
                          value={config.conversion_id || ''}
                          onChange={(e) => handleConfigChange(item.id, 'conversion_id', e.target.value)}
                          placeholder="AW-XXXXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Conversion Label
                        </label>
                        <input
                          type="text"
                          value={config.conversion_label || ''}
                          onChange={(e) => handleConfigChange(item.id, 'conversion_label', e.target.value)}
                          placeholder="e.g. AbC-D_efGhiJ"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                    </>
                  )}

                  {item.platform === 'custom_webhook' && (
                    <>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Webhook Destination URL
                        </label>
                        <input
                          type="url"
                          value={config.webhook_url || ''}
                          onChange={(e) => handleConfigChange(item.id, 'webhook_url', e.target.value)}
                          placeholder="https://crm.yourcompany.com/api/leads"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Secret Key (HMAC-SHA256 Signature Header)
                        </label>
                        <input
                          type="text"
                          value={config.secret_key || ''}
                          onChange={(e) => handleConfigChange(item.id, 'secret_key', e.target.value)}
                          placeholder="Generated secret for signing requests"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                    </>
                  )}

                  {item.platform === 'whatsapp_business' && (
                    <>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          WhatsApp Phone Number ID
                        </label>
                        <input
                          type="text"
                          value={config.phone_number_id || ''}
                          onChange={(e) => handleConfigChange(item.id, 'phone_number_id', e.target.value)}
                          placeholder="e.g. 106728392019283"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-300 mb-1">
                          Permanent Access Token
                        </label>
                        <div className="relative">
                          <input
                            type={showSecret['wa_token'] ? 'text' : 'password'}
                            value={config.access_token || ''}
                            onChange={(e) => handleConfigChange(item.id, 'access_token', e.target.value)}
                            placeholder="EAAGm..."
                            className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 focus:border-[#00FC43] focus:outline-none text-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => toggleReveal('wa_token')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                          >
                            {showSecret['wa_token'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => handleTestConnection(item)}
                    disabled={isTestingThis}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isTestingThis ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Test Connection</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveIntegration(item)}
                    disabled={isSavingThis}
                    className="brand-glow-button px-4 py-1.5 rounded-lg text-xs font-bold text-[#041608] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSavingThis ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dispatched Event Logs Table */}
      <div className="rounded-xl border border-white/10 bg-[#080d09] overflow-hidden space-y-2 p-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00FC43]" />
            <span>Dispatched Marketing Event Audit Log</span>
          </h3>
          <span className="text-[11px] text-neutral-500">Last 30 Events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.01] border-b border-white/10 text-neutral-500 text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Integration</th>
                <th className="py-2.5 px-3">Event Name</th>
                <th className="py-2.5 px-3">Event ID</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Response</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px] font-mono">
              {recentLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500 font-sans">
                    No marketing events dispatched yet. Click any WhatsApp trigger to record live events.
                  </td>
                </tr>
              ) : (
                recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-3 text-neutral-400">
                      {new Date(log.created_at).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="py-2 px-3 text-white font-sans font-medium">
                      {log.integration_name}
                    </td>
                    <td className="py-2 px-3 text-[#00FC43]">{log.event_name}</td>
                    <td className="py-2 px-3 text-neutral-400 truncate max-w-[120px]">
                      {log.event_id || '—'}
                    </td>
                    <td className="py-2 px-3">
                      {log.status === 'delivered' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          HTTP {log.http_status || 200}
                        </span>
                      ) : log.status === 'skipped' ? (
                        <span className="text-neutral-500">Skipped</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          HTTP {log.http_status || 'Fail'}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-neutral-400 truncate max-w-[200px]" title={log.error_message || log.response_body || ''}>
                      {log.error_message || log.response_body || 'Success'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
