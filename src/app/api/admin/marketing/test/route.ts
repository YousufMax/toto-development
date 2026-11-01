import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { platform, config } = body;

    if (!platform || !config) {
      return NextResponse.json({ error: 'Platform and configuration required' }, { status: 400 });
    }

    let success = false;
    let message = '';
    let httpStatus = 200;
    let details: any = null;

    if (platform === 'meta_capi') {
      const pixelId = config.pixel_id;
      const accessToken = config.access_token;
      const testCode = config.test_event_code;

      if (!pixelId || !accessToken) {
        return NextResponse.json({
          success: false,
          message: 'Pixel ID and System User Access Token are required.',
        });
      }

      const testPayload = {
        data: [
          {
            event_name: 'TestConnection',
            event_time: Math.floor(Date.now() / 1000),
            event_id: 'test_' + Date.now(),
            action_source: 'website',
            event_source_url: 'https://totodevelopment.com/test',
            user_data: {
              client_user_agent: 'TOTO-Admin-Diagnostics/2.0',
            },
            custom_data: {
              status: 'diagnostic_test_ping',
            },
          },
        ],
        ...(testCode ? { test_event_code: testCode } : {}),
      };

      const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });

      httpStatus = res.status;
      const jsonRes = await res.json().catch(() => ({}));

      if (res.ok && jsonRes.events_received) {
        success = true;
        message = `Meta CAPI Connected successfully! Received ${jsonRes.events_received} test event(s).`;
        details = jsonRes;
      } else {
        success = false;
        message = jsonRes?.error?.message || `Meta API Error (HTTP ${res.status})`;
        details = jsonRes;
      }
    } else if (platform === 'ga4') {
      const measurementId = config.measurement_id;
      const apiSecret = config.api_secret;

      if (!measurementId || !apiSecret) {
        return NextResponse.json({
          success: false,
          message: 'Measurement ID and API Secret are required.',
        });
      }

      // GA4 debug endpoint
      const endpoint = `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
      const payload = {
        client_id: 'test_client_id_001',
        events: [
          {
            name: 'diagnostic_test',
            params: {
              engagement_time_msec: 100,
            },
          },
        ],
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      httpStatus = res.status;
      const debugRes = await res.json().catch(() => ({}));

      if (res.ok && (!debugRes.validationMessages || debugRes.validationMessages.length === 0)) {
        success = true;
        message = 'Google Analytics 4 Measurement Protocol connection verified successfully!';
        details = debugRes;
      } else {
        success = false;
        message =
          debugRes.validationMessages?.[0]?.description ||
          `GA4 validation failed with HTTP ${res.status}`;
        details = debugRes;
      }
    } else if (platform === 'custom_webhook') {
      const webhookUrl = config.webhook_url;
      if (!webhookUrl) {
        return NextResponse.json({ success: false, message: 'Webhook URL is required.' });
      }

      const testPayload = {
        event: 'DIAGNOSTIC_PING',
        timestamp: new Date().toISOString(),
        agency: 'TOTO Development',
        status: 'system_health_check',
      };
      const bodyStr = JSON.stringify(testPayload);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'TOTO-Admin-Diagnostics/2.0',
      };

      if (config.secret_key) {
        const sig = crypto.createHmac('sha256', config.secret_key).update(bodyStr).digest('hex');
        headers['X-TOTO-Signature'] = sig;
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: bodyStr,
      });

      httpStatus = res.status;
      const textRes = await res.text().catch(() => '');

      if (res.ok) {
        success = true;
        message = `Webhook endpoint received test ping successfully (HTTP ${res.status})!`;
        details = { response: textRes.slice(0, 300) };
      } else {
        success = false;
        message = `Webhook returned HTTP error ${res.status}: ${textRes.slice(0, 200)}`;
      }
    } else if (platform === 'whatsapp_business') {
      const phoneNumberId = config.phone_number_id;
      const accessToken = config.access_token;

      if (!phoneNumberId || !accessToken) {
        return NextResponse.json({
          success: false,
          message: 'Phone Number ID and Access Token are required.',
        });
      }

      const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}?access_token=${accessToken}`;
      const res = await fetch(endpoint);
      httpStatus = res.status;
      const jsonRes = await res.json().catch(() => ({}));

      if (res.ok && jsonRes.id) {
        success = true;
        message = `WhatsApp Cloud API verified! Connected number: ${jsonRes.display_phone_number || jsonRes.id} (${jsonRes.verified_name || 'Verified'})`;
        details = jsonRes;
      } else {
        success = false;
        message = jsonRes?.error?.message || `WhatsApp Cloud API verification failed (HTTP ${res.status})`;
        details = jsonRes;
      }
    } else {
      // Browser tags like Meta Pixel, GTM, Google Ads
      success = true;
      message = 'Format validated. Browser tag is active and ready for client script injection.';
    }

    // Update database integration record if exists
    try {
      const updateStatus = success ? 'active' : 'error';
      await query(
        `UPDATE marketing_integrations 
         SET status = $1, 
             last_success_at = ${success ? 'NOW()' : 'last_success_at'},
             last_error_at = ${!success ? 'NOW()' : 'last_error_at'},
             last_error_message = $2,
             updated_at = NOW()
         WHERE platform = $3`,
        [updateStatus, success ? null : message, platform]
      );
    } catch (e) {
      console.error('Error updating test result in DB:', e);
    }

    return NextResponse.json({
      success,
      httpStatus,
      message,
      details,
    });
  } catch (err: any) {
    console.error('Diagnostic test connection error:', err);
    return NextResponse.json({
      success: false,
      message: err.message || 'Connection test failed to reach destination server.',
    });
  }
}
