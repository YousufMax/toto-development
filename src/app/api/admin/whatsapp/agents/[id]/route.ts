import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

function normalizePhoneNumber(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : `+${digits}`;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const agentId = parseInt(params.id, 10);
  if (isNaN(agentId)) {
    return NextResponse.json({ error: 'Invalid agent ID' }, { status: 400 });
  }

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
      display_order,
    } = body;

    // Check if agent exists
    const existing = await query('SELECT * FROM whatsapp_agents WHERE id = $1 AND is_deleted = false', [agentId]);
    if (existing.rows.length === 0) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    let cleanPhone = undefined;
    if (phone_number !== undefined) {
      cleanPhone = normalizePhoneNumber(phone_number);
      if (cleanPhone.length < 9) {
        return NextResponse.json({ error: 'Please enter a valid phone number with country code.' }, { status: 400 });
      }

      // Check duplicate
      const dup = await query(
        'SELECT id, agent_name FROM whatsapp_agents WHERE phone_number = $1 AND id != $2 AND is_deleted = false',
        [cleanPhone, agentId]
      );
      if (dup.rows.length > 0) {
        return NextResponse.json(
          { error: `Phone number ${cleanPhone} is already used by ${dup.rows[0].agent_name}.` },
          { status: 400 }
        );
      }
    }

    if (is_default) {
      await query('UPDATE whatsapp_agents SET is_default = false WHERE id != $1 AND is_deleted = false', [agentId]);
    }
    if (is_fallback) {
      await query('UPDATE whatsapp_agents SET is_fallback = false WHERE id != $1 AND is_deleted = false', [agentId]);
    }

    const res = await query(
      `UPDATE whatsapp_agents 
       SET 
         agent_name = COALESCE($1, agent_name),
         phone_number = COALESCE($2, phone_number),
         status = COALESCE($3, status),
         is_default = COALESCE($4, is_default),
         is_fallback = COALESCE($5, is_fallback),
         custom_prefilled_message = COALESCE($6, custom_prefilled_message),
         notes = COALESCE($7, notes),
         display_order = COALESCE($8, display_order),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $9 AND is_deleted = false
       RETURNING *`,
      [
        agent_name?.trim(),
        cleanPhone,
        status,
        is_default !== undefined ? !!is_default : null,
        is_fallback !== undefined ? !!is_fallback : null,
        custom_prefilled_message?.trim(),
        notes?.trim(),
        display_order !== undefined ? parseInt(display_order, 10) : null,
        agentId,
      ]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Agent not found or already deleted' }, { status: 404 });
    }

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'UPDATE_WHATSAPP_AGENT', 'whatsapp_agent', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        agentId.toString(),
        JSON.stringify({ agentName: res.rows[0].agent_name, status: res.rows[0].status, phone: res.rows[0].phone_number }),
      ]
    );

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    console.error('Error updating agent:', err);
    return NextResponse.json({ error: 'Failed to update agent: ' + (err.message || 'Server error') }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req, ['super_admin', 'admin']);
  if ('error' in auth) return auth.error;

  const agentId = parseInt(params.id, 10);
  if (isNaN(agentId)) {
    return NextResponse.json({ error: 'Invalid agent ID' }, { status: 400 });
  }

  try {
    const existing = await query('SELECT * FROM whatsapp_agents WHERE id = $1 AND is_deleted = false', [agentId]);
    if (existing.rows.length === 0) {
      return NextResponse.json({ error: 'Agent not found or already deleted' }, { status: 404 });
    }

    const wasDefault = existing.rows[0].is_default;
    const wasFallback = existing.rows[0].is_fallback;

    // 1. Soft-delete agent to preserve historical clicks and conversion tracking
    await query(
      `UPDATE whatsapp_agents 
       SET 
         is_deleted = true, 
         deleted_at = CURRENT_TIMESTAMP, 
         status = 'inactive',
         is_default = false,
         is_fallback = false,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [agentId]
    );

    // 2. Deactivate active shift schedules associated with this agent
    await query('UPDATE whatsapp_schedules SET is_active = false WHERE agent_id = $1', [agentId]);

    // 3. If this was the default agent, reassign default to next active agent
    if (wasDefault) {
      const nextActive = await query(
        `SELECT id FROM whatsapp_agents WHERE is_deleted = false AND status = 'active' ORDER BY id ASC LIMIT 1`
      );
      if (nextActive.rows.length > 0) {
        await query('UPDATE whatsapp_agents SET is_default = true WHERE id = $1', [nextActive.rows[0].id]);
      }
    }

    // 4. Log activity
    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'DELETE_WHATSAPP_AGENT', 'whatsapp_agent', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        agentId.toString(),
        JSON.stringify({ agentName: existing.rows[0].agent_name, phone: existing.rows[0].phone_number, softDeleted: true }),
      ]
    );

    return NextResponse.json({ success: true, message: 'Agent deleted safely (historical analytics preserved).' });
  } catch (err: any) {
    console.error('Error deleting agent:', err);
    return NextResponse.json({ error: 'Failed to delete agent: ' + (err.message || 'Server error') }, { status: 500 });
  }
}
