import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const scheduleId = parseInt(params.id, 10);
  if (isNaN(scheduleId)) {
    return NextResponse.json({ error: 'Invalid schedule ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const {
      agent_id,
      day_of_week,
      start_time,
      end_time,
      is_active,
      is_overnight,
      priority,
    } = body;

    const computedOvernight =
      is_overnight !== undefined
        ? !!is_overnight
        : start_time && end_time && start_time > end_time;

    const res = await query(
      `UPDATE whatsapp_schedules
       SET 
         agent_id = COALESCE($1, agent_id),
         day_of_week = COALESCE($2, day_of_week),
         start_time = COALESCE($3, start_time),
         end_time = COALESCE($4, end_time),
         is_active = COALESCE($5, is_active),
         is_overnight = COALESCE($6, is_overnight),
         priority = COALESCE($7, priority),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [
        agent_id,
        day_of_week,
        start_time,
        end_time,
        is_active !== undefined ? !!is_active : null,
        computedOvernight !== undefined ? computedOvernight : null,
        priority !== undefined ? parseInt(priority, 10) : null,
        scheduleId,
      ]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    console.error('Error updating schedule:', err);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const scheduleId = parseInt(params.id, 10);
  if (isNaN(scheduleId)) {
    return NextResponse.json({ error: 'Invalid schedule ID' }, { status: 400 });
  }

  try {
    await query('DELETE FROM whatsapp_schedules WHERE id = $1', [scheduleId]);
    return NextResponse.json({ success: true, message: 'Schedule removed' });
  } catch (err: any) {
    console.error('Error deleting schedule:', err);
    return NextResponse.json({ error: 'Failed to delete schedule' }, { status: 500 });
  }
}
