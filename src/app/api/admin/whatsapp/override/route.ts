import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const { enabled, agent_id } = await req.json();

    const meta = {
      enabled: !!enabled,
      agent_id: enabled ? parseInt(agent_id, 10) : null,
      updated_by: auth.session.name,
      updated_at: new Date().toISOString(),
    };

    await query(
      `INSERT INTO website_content (section_key, section_group, title, content_value, meta_json, is_published)
       VALUES ('whatsapp_manual_override', 'settings', 'WhatsApp Manual Override', $1, $2, true)
       ON CONFLICT (section_key) DO UPDATE
       SET meta_json = $2, content_value = $1, updated_at = CURRENT_TIMESTAMP`,
      [enabled ? `Override to Agent ID: ${agent_id}` : 'Automatic Scheduling Active', JSON.stringify(meta)]
    );

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'WHATSAPP_OVERRIDE_TOGGLE', 'whatsapp_override', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        agent_id ? agent_id.toString() : 'none',
        JSON.stringify(meta),
      ]
    );

    return NextResponse.json({ success: true, override: meta });
  } catch (err: any) {
    console.error('Error toggling WhatsApp override:', err);
    return NextResponse.json({ error: 'Failed to update override' }, { status: 500 });
  }
}
