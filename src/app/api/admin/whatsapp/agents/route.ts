import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

function normalizePhoneNumber(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : `+${digits}`;
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const agentsRes = await query(`
      SELECT 
        a.id,
        a.agent_name,
        a.phone_number,
        a.status,
        a.is_default,
        a.is_fallback,
        a.custom_prefilled_message,
        a.total_clicks,
        a.notes,
        a.display_order,
        a.created_at,
        a.updated_at,
        COUNT(DISTINCT s.id) as schedule_count
      FROM whatsapp_agents a
      LEFT JOIN whatsapp_schedules s ON a.id = s.agent_id AND s.is_active = true
      WHERE a.is_deleted = false
      GROUP BY a.id
      ORDER BY a.display_order ASC, a.created_at ASC
    `);

    // Return as array and support object wrapper for maximum client compatibility
    return NextResponse.json(agentsRes.rows);
  } catch (err: any) {
    console.error('Error fetching agents:', err);
    return NextResponse.json({ error: 'Failed to fetch WhatsApp agents' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const {
      agent_name,
      phone_number,
      status,
      is_default,
      is_fallback,
      custom_prefilled_message,
      notes,
    } = body;

    if (!agent_name || typeof agent_name !== 'string' || !agent_name.trim()) {
      return NextResponse.json(
        { error: 'Agent name is required.' },
        { status: 400 }
      );
    }

    if (!phone_number || typeof phone_number !== 'string' || !phone_number.trim()) {
      return NextResponse.json(
        { error: 'WhatsApp phone number is required.' },
        { status: 400 }
      );
    }

    const cleanPhone = normalizePhoneNumber(phone_number);
    if (cleanPhone.length < 9) {
      return NextResponse.json(
        { error: 'Please enter a valid international phone number (e.g. +8801800942868).' },
        { status: 400 }
      );
    }

    // Check for duplicate active number
    const dupCheck = await query(
      'SELECT id, agent_name FROM whatsapp_agents WHERE phone_number = $1 AND is_deleted = false',
      [cleanPhone]
    );

    if (dupCheck.rows.length > 0) {
      return NextResponse.json(
        {
          error: `Phone number ${cleanPhone} is already assigned to "${dupCheck.rows[0].agent_name}". Each agent must have a distinct WhatsApp number.`,
        },
        { status: 400 }
      );
    }

    // If setting as default, clear other defaults
    if (is_default) {
      await query('UPDATE whatsapp_agents SET is_default = false WHERE is_deleted = false');
    }
    // If setting as fallback, clear other fallbacks
    if (is_fallback) {
      await query('UPDATE whatsapp_agents SET is_fallback = false WHERE is_deleted = false');
    }

    const res = await query(
      `INSERT INTO whatsapp_agents (
        agent_name, phone_number, status, is_default, is_fallback,
        custom_prefilled_message, notes, is_deleted
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, false) RETURNING *`,
      [
        agent_name.trim(),
        cleanPhone,
        status || 'active',
        !!is_default,
        !!is_fallback,
        custom_prefilled_message?.trim() ||
          'Hi TOTO Development, I would like to consult on your agency services & packages.',
        notes?.trim() || null,
      ]
    );

    // Activity log
    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'CREATE_WHATSAPP_AGENT', 'whatsapp_agent', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        res.rows[0].id.toString(),
        JSON.stringify({ agentName: agent_name.trim(), phone: cleanPhone }),
      ]
    );

    return NextResponse.json(res.rows[0], { status: 201 });
  } catch (err: any) {
    console.error('Error creating WhatsApp agent:', err);
    return NextResponse.json({ error: 'Failed to create agent: ' + (err.message || 'Server error') }, { status: 500 });
  }
}
