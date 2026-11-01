import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { resolveActiveWhatsAppNumber } from '@/lib/whatsapp-resolver';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let route = searchParams.get('route') || '/';

    // Normalize route
    if (!route.endsWith('/') && route !== '') {
      route = route + '/';
    }

    const popupRes = await query(
      `SELECT * FROM engagement_popups WHERE page_route = $1 AND is_enabled = true`,
      [route]
    );

    let popup = popupRes.rows[0];

    // Fallback to home popup if specific page popup not found
    if (!popup && route !== '/') {
      const homeRes = await query(
        `SELECT * FROM engagement_popups WHERE page_route = '/' AND is_enabled = true`
      );
      popup = homeRes.rows[0];
    }

    if (!popup) {
      return NextResponse.json({ enabled: false }, { status: 200 });
    }

    // Resolve WhatsApp number
    let waPhone = '';
    let waMsg = popup.prefilled_message || '';
    let agentName = '';

    if (popup.specific_agent_id) {
      const specificAgentRes = await query(
        'SELECT id, agent_name, phone_number, custom_prefilled_message FROM whatsapp_agents WHERE id = $1 AND status != \'inactive\'',
        [popup.specific_agent_id]
      );
      if (specificAgentRes.rows.length > 0) {
        waPhone = specificAgentRes.rows[0].phone_number;
        agentName = specificAgentRes.rows[0].agent_name;
        if (!waMsg) waMsg = specificAgentRes.rows[0].custom_prefilled_message;
      }
    }

    if (!waPhone) {
      const active = await resolveActiveWhatsAppNumber();
      waPhone = active.phoneNumber;
      agentName = active.agentName;
      if (!waMsg) waMsg = active.prefilledMessage;
    }

    const cleanPhone = waPhone.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;

    return NextResponse.json({
      enabled: true,
      id: popup.id,
      title: popup.title,
      description: popup.description,
      ctaText: popup.cta_text || 'Chat on WhatsApp',
      delaySeconds: popup.delay_seconds || 15,
      displayFrequency: popup.display_frequency || 'once_per_session',
      showOnMobile: popup.show_on_mobile,
      showOnDesktop: popup.show_on_desktop,
      agentName,
      whatsappNumber: waPhone,
      whatsappUrl,
    });
  } catch (err: any) {
    console.error('Popup active error:', err);
    return NextResponse.json({ enabled: false }, { status: 200 });
  }
}
