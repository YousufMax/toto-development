import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const notificationsRes = await query(`
      SELECT * FROM admin_notifications 
      ORDER BY created_at DESC 
      LIMIT 25
    `);

    const unreadCountRes = await query(`
      SELECT COUNT(*) as count FROM admin_notifications WHERE is_read = false
    `);

    return NextResponse.json({
      success: true,
      notifications: notificationsRes.rows,
      unreadCount: parseInt(unreadCountRes.rows[0]?.count || '0', 10),
    });
  } catch (err: any) {
    console.error('Error fetching admin notifications:', err);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { notificationId, markAllRead } = body;

    if (markAllRead) {
      await query(`UPDATE admin_notifications SET is_read = true WHERE is_read = false`);
    } else if (notificationId) {
      await query(`UPDATE admin_notifications SET is_read = true WHERE id = $1`, [notificationId]);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error updating notifications:', err);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
