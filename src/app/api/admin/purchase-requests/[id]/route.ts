import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const requestId = params.id;

  try {
    const res = await query(
      `SELECT 
        pr.*,
        u.name as assigned_agent_name,
        u.email as assigned_agent_email
       FROM purchase_requests pr
       LEFT JOIN admin_users u ON pr.assigned_agent_id = u.id
       WHERE pr.id = $1`,
      [requestId]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Purchase request not found' }, { status: 404 });
    }

    // Fetch timeline history
    const historyRes = await query(
      `SELECT * FROM lead_history WHERE request_id = $1 ORDER BY created_at DESC`,
      [requestId]
    );

    return NextResponse.json({
      request: res.rows[0],
      history: historyRes.rows,
    });
  } catch (err: any) {
    console.error('Error fetching request details:', err);
    return NextResponse.json({ error: 'Failed to fetch details' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const requestId = params.id;

  try {
    const body = await req.json();
    const { status, internal_notes, assigned_agent_id, note } = body;

    const existingRes = await query(
      'SELECT id, status, internal_notes, assigned_agent_id FROM purchase_requests WHERE id = $1',
      [requestId]
    );

    if (existingRes.rows.length === 0) {
      return NextResponse.json({ error: 'Purchase request not found' }, { status: 404 });
    }

    const prev = existingRes.rows[0];
    const newStatus = status || prev.status;

    const res = await query(
      `UPDATE purchase_requests
       SET
         status = COALESCE($1, status),
         internal_notes = COALESCE($2, internal_notes),
         assigned_agent_id = $3,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [
        status,
        internal_notes,
        assigned_agent_id !== undefined ? assigned_agent_id : prev.assigned_agent_id,
        requestId,
      ]
    );

    // If status changed or note provided, append to history
    if ((status && status !== prev.status) || note) {
      await query(
        `INSERT INTO lead_history (request_id, user_id, user_name, previous_status, new_status, note)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          requestId,
          auth.session.id,
          auth.session.name,
          prev.status,
          newStatus,
          note || `Status updated from ${prev.status} to ${newStatus}`,
        ]
      );
    }

    // Activity log
    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'UPDATE_LEAD_STATUS', 'purchase_request', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        requestId,
        JSON.stringify({ previousStatus: prev.status, newStatus, note }),
      ]
    );

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    console.error('Error updating purchase request:', err);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}
