import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';
import { resolveActiveWhatsAppNumber } from '@/lib/whatsapp-resolver';
import { dispatchMarketingEvent } from '@/lib/marketing/event-dispatcher';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      agentId,
      phoneNumber: providedPhone,
      source = 'website_trigger',
      pageUrl = '',
      packageId = null,
      packageName = null,
      packagePrice = null,
      utmSource = null,
      utmMedium = null,
      utmCampaign = null,
      utmContent = null,
      utmTerm = null,
      sessionId = null,
      deviceCategory: clientDevice = null,
      prefilledMessage: customMsg = null,
    } = body;

    // Extract network headers
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Auto-detect device category if not sent from client
    let deviceCategory = clientDevice;
    if (!deviceCategory) {
      const ua = userAgent.toLowerCase();
      if (/tablet|ipad|playbook|silk/i.test(ua)) {
        deviceCategory = 'tablet';
      } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
        deviceCategory = 'mobile';
      } else {
        deviceCategory = 'desktop';
      }
    }

    // Resolve target agent and phone number
    let finalAgentId = agentId ? Number(agentId) : null;
    let finalPhone = providedPhone ? String(providedPhone).trim() : null;
    let finalAgentName = 'TOTO Development';
    let textMessage = customMsg;

    if (!finalPhone || !finalAgentId) {
      // Resolve using dynamic schedule and fallback system
      const resolved = await resolveActiveWhatsAppNumber();
      finalAgentId = resolved.agentId;
      finalPhone = resolved.phoneNumber;
      finalAgentName = resolved.agentName;
      if (!textMessage) {
        textMessage = resolved.prefilledMessage;
      }
    } else {
      // Fetch agent name if agentId provided
      try {
        const agentCheck = await query(
          `SELECT id, agent_name, phone_number, custom_prefilled_message FROM whatsapp_agents WHERE id = $1 AND is_deleted = false`,
          [finalAgentId]
        );
        if (agentCheck.rows.length > 0) {
          finalAgentName = agentCheck.rows[0].agent_name;
          if (!textMessage) {
            textMessage = agentCheck.rows[0].custom_prefilled_message;
          }
        }
      } catch (e) {
        console.error('Agent lookup error in track route:', e);
      }
    }

    // Fallback message default
    if (!textMessage) {
      textMessage = 'Hi TOTO Development, I would like to consult on your agency services & packages.';
    }

    // Generate unique event ID for deduplication (Meta CAPI + Pixel)
    const eventId = crypto.randomUUID();
    const effectiveSessionId = sessionId || crypto.randomUUID();

    // 1. Record in whatsapp_clicks table
    try {
      await query(
        `INSERT INTO whatsapp_clicks 
          (agent_id, phone_number, page_url, source, ip_address, user_agent, event_id, session_id, package_id, utm_source, utm_medium, utm_campaign, device_category)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          finalAgentId,
          finalPhone,
          pageUrl,
          source,
          clientIp,
          userAgent,
          eventId,
          effectiveSessionId,
          packageId ? Number(packageId) : null,
          utmSource,
          utmMedium,
          utmCampaign,
          deviceCategory,
        ]
      );
    } catch (dbErr) {
      console.error('Error recording whatsapp_clicks:', dbErr);
    }

    // 2. Increment agent click counter & update last_active_at
    if (finalAgentId) {
      try {
        await query(
          `UPDATE whatsapp_agents 
           SET total_clicks = total_clicks + 1, 
               last_active_at = NOW() 
           WHERE id = $1`,
          [finalAgentId]
        );
      } catch (agentErr) {
        console.error('Error updating agent total_clicks:', agentErr);
      }
    }

    // 3. Record conversion event in conversion_events
    try {
      await query(
        `INSERT INTO conversion_events 
          (event_id, session_id, event_name, page_url, package_id, agent_id, utm_source, utm_medium, utm_campaign, utm_content, utm_term, ip_address, user_agent, device_category, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          eventId,
          effectiveSessionId,
          'whatsapp_click',
          pageUrl,
          packageId ? Number(packageId) : null,
          finalAgentId,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
          clientIp,
          userAgent,
          deviceCategory,
          JSON.stringify({
            agentName: finalAgentName,
            phoneNumber: finalPhone,
            source,
            packageName,
            packagePrice,
          }),
        ]
      );
    } catch (convErr) {
      console.error('Error recording conversion_event:', convErr);
    }

    // 4. Dispatch server-side marketing events (Meta CAPI, GA4, Webhook)
    // Non-blocking background promise
    dispatchMarketingEvent({
      eventName: 'Contact',
      eventId,
      pageUrl,
      clientIp,
      userAgent,
      sessionId: effectiveSessionId,
      customData: {
        agentId: finalAgentId,
        agentName: finalAgentName,
        source,
        packageName,
        packageId,
        packagePrice,
        currency: 'BDT',
      },
    }).catch((e) => console.error('Error dispatching marketing event:', e));

    // Construct destination URL: digits only for wa.me
    const cleanPhone = (finalPhone || '+8801800942868').replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(textMessage);
    const destinationUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    return NextResponse.json({
      success: true,
      eventId,
      destinationUrl,
      agent: {
        id: finalAgentId,
        name: finalAgentName,
        phoneNumber: finalPhone,
      },
    });
  } catch (err: any) {
    console.error('WhatsApp track error:', err);
    // Graceful fallback URL
    return NextResponse.json(
      {
        success: false,
        eventId: crypto.randomUUID(),
        destinationUrl: 'https://wa.me/8801800942868?text=Hi%20TOTO%20Development',
      },
      { status: 200 }
    );
  }
}
