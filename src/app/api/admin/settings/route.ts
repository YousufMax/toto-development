import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const userRes = await query(
      'SELECT id, name, email, role, avatar_url, last_login_at, created_at FROM admin_users WHERE id = $1',
      [auth.session.id]
    );

    const allUsersRes = await query(
      'SELECT id, name, email, role, is_active, last_login_at, created_at FROM admin_users ORDER BY id ASC'
    );

    return NextResponse.json({
      currentUser: userRes.rows[0],
      users: allUsersRes.rows,
    });
  } catch (err: any) {
    console.error('Error fetching settings:', err);
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const { name, current_password, new_password, avatar_url } = body;

    if (new_password) {
      if (!current_password) {
        return NextResponse.json(
          { error: 'Current password is required to set a new password' },
          { status: 400 }
        );
      }

      const userRes = await query(
        'SELECT password_hash FROM admin_users WHERE id = $1',
        [auth.session.id]
      );

      const isValid = await bcrypt.compare(
        current_password,
        userRes.rows[0].password_hash
      );

      if (!isValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      if (new_password.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters' },
          { status: 400 }
        );
      }

      const newHash = await bcrypt.hash(new_password, 10);
      await query(
        'UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [newHash, auth.session.id]
      );
    }

    if (name || avatar_url) {
      await query(
        `UPDATE admin_users 
         SET name = COALESCE($1, name), avatar_url = COALESCE($2, avatar_url), updated_at = CURRENT_TIMESTAMP 
         WHERE id = $3`,
        [name?.trim(), avatar_url?.trim(), auth.session.id]
      );
    }

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'UPDATE_PROFILE', 'user', $3, '{"updated": true}'::jsonb)`,
      [auth.session.id, auth.session.name, auth.session.id.toString()]
    );

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (err: any) {
    console.error('Error updating settings:', err);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
