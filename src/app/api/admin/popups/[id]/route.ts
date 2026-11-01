import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const popupId = parseInt(params.id, 10);
  if (isNaN(popupId)) {
    return NextResponse.json({ error: 'Invalid popup ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const {
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

    const res = await query(
      `UPDATE engagement_popups
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         cta_text = COALESCE($3, cta_text),
         prefilled_message = $4,
         delay_seconds = COALESCE($5, delay_seconds),
         display_frequency = COALESCE($6, display_frequency),
         is_enabled = COALESCE($7, is_enabled),
         show_on_mobile = COALESCE($8, show_on_mobile),
         show_on_desktop = COALESCE($9, show_on_desktop),
         specific_agent_id = $10,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING *`,
      [
        title?.trim(),
        description?.trim(),
        cta_text?.trim(),
        prefilled_message !== undefined ? prefilled_message : null,
        delay_seconds !== undefined ? parseInt(delay_seconds, 10) : null,
        display_frequency,
        is_enabled !== undefined ? !!is_enabled : null,
        show_on_mobile !== undefined ? !!show_on_mobile : null,
        show_on_desktop !== undefined ? !!show_on_desktop : null,
        specific_agent_id !== undefined ? specific_agent_id : null,
        popupId,
      ]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Popup not found' }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    console.error('Error updating popup:', err);
    return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  const popupId = parseInt(params.id, 10);
  if (isNaN(popupId)) {
    return NextResponse.json({ error: 'Invalid popup ID' }, { status: 400 });
  }

  try {
    await query('DELETE FROM engagement_popups WHERE id = $1', [popupId]);
    return NextResponse.json({ success: true, message: 'Popup removed' });
  } catch (err: any) {
    console.error('Error deleting popup:', err);
    return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 });
  }
}
