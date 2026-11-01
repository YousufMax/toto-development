import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const res = await query(`
      SELECT 
        ep.*,
        a.agent_name as assigned_agent_name,
        a.phone_number as assigned_agent_phone
      FROM engagement_popups ep
      LEFT JOIN whatsapp_agents a ON ep.specific_agent_id = a.id
      ORDER BY ep.page_route ASC
    `);

    return NextResponse.json(res.rows);
  } catch (err: any) {
    console.error('Error fetching popups:', err);
    return NextResponse.json({ error: 'Failed to fetch popups' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const {
      page_route,
      title,
      description,
      cta_text,
      prefilled_message,
      delay_seconds,
      display_frequency,
      is_enabled,
      show_on_mobile,
      show_on_desktop,
      specific_agent_id,
    } = body;

    if (!page_route || !title || !description) {
      return NextResponse.json(
        { error: 'Page route, title, and description are required.' },
        { status: 400 }
      );
    }

    const cleanRoute = page_route.startsWith('/') ? page_route : '/' + page_route;

    const res = await query(
      `INSERT INTO engagement_popups (
        page_route, title, description, cta_text, prefilled_message,
        delay_seconds, display_frequency, is_enabled, show_on_mobile, show_on_desktop, specific_agent_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (page_route) DO UPDATE
      SET title = $2, description = $3, cta_text = $4, prefilled_message = $5,
          delay_seconds = $6, display_frequency = $7, is_enabled = $8,
          show_on_mobile = $9, show_on_desktop = $10, specific_agent_id = $11, updated_at = CURRENT_TIMESTAMP
      RETURNING *`,
      [
        cleanRoute,
        title.trim(),
        description.trim(),
        cta_text || 'Chat on WhatsApp',
        prefilled_message || null,
        delay_seconds || 15,
        display_frequency || 'once_per_session',
        is_enabled !== undefined ? !!is_enabled : true,
        show_on_mobile !== undefined ? !!show_on_mobile : true,
        show_on_desktop !== undefined ? !!show_on_desktop : true,
        specific_agent_id || null,
      ]
    );

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (err: any) {
    console.error('Error saving popup:', err);
    return NextResponse.json({ error: 'Failed to save popup' }, { status: 500 });
  }
}
