import { query } from '@/lib/db';
import crypto from 'crypto';

export interface DispatchEventOptions {
  eventName: 'Contact' | 'Lead' | 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'PurchaseRequest';
  eventId: string;
  pageUrl?: string;
  clientIp?: string;
  userAgent?: string;
  sessionId?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, any>;
}

// SHA-256 hash helper for CAPI PII
function sha256(value?: string): string | undefined {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export async function dispatchMarketingEvent(event: DispatchEventOptions): Promise<void> {
  try {
    // 1. Fetch all enabled marketing integrations
    const integrationsRes = await query(
      `SELECT id, platform, name, config, is_enabled 
       FROM marketing_integrations 
       WHERE is_enabled = true`
    );

    if (integrationsRes.rows.length === 0) {
      return;
    }

    const tasks = integrationsRes.rows.map(async (integration) => {
      const config = integration.config || {};
      const platform = integration.platform;

      let status: 'delivered' | 'failed' | 'skipped' = 'skipped';
      let httpStatus: number | null = null;
      let responseBody: string | null = null;
      let errorMessage: string | null = null;
      let payloadToSend: Record<string, any> = {};

      try {
        if (platform === 'meta_capi') {
          const pixelId = config.pixel_id;
          const accessToken = config.access_token;

          if (!pixelId || !accessToken) {
            status = 'skipped';
            errorMessage = 'Meta CAPI is enabled but Pixel ID or Access Token is missing';
          } else {
            // Map event names to Meta standard events
            let capiEventName = event.eventName;
            if (event.eventName === 'PurchaseRequest') {
              capiEventName = 'Lead';
            }

            const unixTime = Math.floor(Date.now() / 1000);

            const userData: Record<string, any> = {
              client_user_agent: event.userAgent || undefined,
            };

            if (event.clientIp && event.clientIp !== 'unknown') {
              userData.client_ip_address = event.clientIp;
            }
            if (event.fbp) userData.fbp = event.fbp;
            if (event.fbc) userData.fbc = event.fbc;
            if (event.email) userData.em = [sha256(event.email)];
            if (event.phone) userData.ph = [sha256(event.phone)];

            payloadToSend = {
              data: [
                {
                  event_name: capiEventName,
                  event_time: unixTime,
                  event_id: event.eventId, // Matches client-side Meta Pixel eventID for deduplication
                  event_source_url: event.pageUrl || 'https://totodevelopment.com',
                  action_source: 'website',
                  user_data: userData,
                  custom_data: {
                    content_name: event.customData?.packageName || 'Agency Consultation',
                    value: event.customData?.value || 0,
                    currency: event.customData?.currency || 'BDT',
                    ...event.customData,
                  },
                },
              ],
              ...(config.test_event_code ? { test_event_code: config.test_event_code } : {}),
            };

            const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
            
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 4000);

            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payloadToSend),
              signal: controller.signal,
            });
            clearTimeout(timeout);

            httpStatus = res.status;
            responseBody = await res.text();

            if (res.ok) {
              status = 'delivered';
            } else {
              status = 'failed';
              errorMessage = `Meta CAPI responded with HTTP ${res.status}: ${responseBody.slice(0, 300)}`;
            }
          }
        } else if (platform === 'ga4') {
          const measurementId = config.measurement_id;
          const apiSecret = config.api_secret;

          if (!measurementId || !apiSecret) {
            status = 'skipped';
            errorMessage = 'GA4 is enabled but Measurement ID or API Secret is missing';
          } else {
            payloadToSend = {
              client_id: event.sessionId || crypto.randomUUID(),
              events: [
                {
                  name: event.eventName.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
                  params: {
                    event_id: event.eventId,
                    page_location: event.pageUrl,
                    ...event.customData,
                  },
                },
              ],
            };

            const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
            
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 4000);

            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payloadToSend),
              signal: controller.signal,
            });
            clearTimeout(timeout);

            httpStatus = res.status;
            status = res.ok || res.status === 204 ? 'delivered' : 'failed';
            responseBody = res.ok ? 'OK' : await res.text();
          }
        } else if (platform === 'custom_webhook') {
          const webhookUrl = config.webhook_url;
          if (!webhookUrl) {
            status = 'skipped';
            errorMessage = 'Custom Webhook is enabled but Webhook URL is missing';
          } else {
            payloadToSend = {
              event_name: event.eventName,
              event_id: event.eventId,
              timestamp: new Date().toISOString(),
              page_url: event.pageUrl,
              session_id: event.sessionId,
              client_ip: event.clientIp,
              user_agent: event.userAgent,
              data: event.customData || {},
            };

            const bodyStr = JSON.stringify(payloadToSend);
            const headers: Record<string, string> = {
              'Content-Type': 'application/json',
              'User-Agent': 'TOTO-Development-Webhook/2.0',
            };

            if (config.secret_key) {
              const signature = crypto.createHmac('sha256', config.secret_key).update(bodyStr).digest('hex');
              headers['X-TOTO-Signature'] = signature;
            }

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 4000);

            const res = await fetch(webhookUrl, {
              method: 'POST',
              headers,
              body: bodyStr,
              signal: controller.signal,
            });
            clearTimeout(timeout);

            httpStatus = res.status;
            responseBody = await res.text().catch(() => '');
            status = res.ok ? 'delivered' : 'failed';
          }
        }
      } catch (err: any) {
        status = 'failed';
        errorMessage = err.name === 'AbortError' ? 'Request timed out after 4000ms' : err.message || String(err);
      }

      // Record log in marketing_events_log
      try {
        await query(
          `INSERT INTO marketing_events_log 
            (integration_id, event_name, event_id, payload, status, http_status, response_body, error_message)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            integration.id,
            event.eventName,
            event.eventId,
            JSON.stringify(payloadToSend),
            status,
            httpStatus,
            responseBody ? responseBody.slice(0, 1000) : null,
            errorMessage,
          ]
        );

        // Update marketing_integrations table health metrics
        if (status === 'delivered') {
          await query(
            `UPDATE marketing_integrations 
             SET last_event_at = NOW(), 
                 last_success_at = NOW(),
                 events_count_30d = events_count_30d + 1,
                 status = 'active',
                 updated_at = NOW()
             WHERE id = $1`,
            [integration.id]
          );
        } else if (status === 'failed') {
          await query(
            `UPDATE marketing_integrations 
             SET last_event_at = NOW(), 
                 last_error_at = NOW(),
                 last_error_message = $2,
                 status = 'error',
                 updated_at = NOW()
             WHERE id = $1`,
            [integration.id, errorMessage]
          );
        }
      } catch (dbErr) {
        console.error('Failed to update marketing integration log:', dbErr);
      }
    });

    await Promise.allSettled(tasks);
  } catch (outerErr) {
    console.error('Error dispatching marketing events:', outerErr);
  }
}
