import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const res = await query('SELECT * FROM website_content ORDER BY section_group ASC, id ASC');
    return NextResponse.json(res.rows);
  } catch (err: any) {
    console.error('Error fetching website content:', err);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const { section_key, section_group, title, content_value, meta_json, is_published } = body;

    if (!section_key || content_value === undefined) {
      return NextResponse.json(
        { error: 'Section key and content value are required.' },
        { status: 400 }
      );
    }

    const res = await query(
      `INSERT INTO website_content (
        section_key, section_group, title, content_value, meta_json, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (section_key) DO UPDATE
      SET title = COALESCE($3, website_content.title),
          content_value = $4,
          meta_json = COALESCE($5, website_content.meta_json),
          is_published = COALESCE($6, website_content.is_published),
          updated_at = CURRENT_TIMESTAMP
      RETURNING *`,
      [
        section_key,
        section_group || 'general',
        title || null,
        content_value,
        meta_json ? JSON.stringify(meta_json) : null,
        is_published !== undefined ? !!is_published : true,
      ]
    );

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'UPDATE_WEBSITE_CONTENT', 'content', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        section_key,
        JSON.stringify({ valueLength: content_value.length }),
      ]
    );

    return NextResponse.json(res.rows[0]);
  } catch (err: any) {
    console.error('Error saving website content:', err);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
