import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const integrationsRes = await query(`
      SELECT 
        id, platform, name, is_enabled, status, config,
        last_event_at, last_success_at, last_error_at, last_error_message,
        events_count_30d, created_at, updated_at
      FROM marketing_integrations
      ORDER BY id ASC
    `);

    // Fetch recent logs
    const logsRes = await query(`
      SELECT l.*, i.name as integration_name, i.platform
      FROM marketing_events_log l
      JOIN marketing_integrations i ON l.integration_id = i.id
      ORDER BY l.created_at DESC
      LIMIT 30
    `);

    return NextResponse.json({
      success: true,
      integrations: integrationsRes.rows,
      recentLogs: logsRes.rows,
    });
  } catch (err: any) {
    console.error('Error fetching marketing integrations:', err);
    return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, is_enabled, config } = body;

    if (!id) {
      return NextResponse.json({ error: 'Integration ID is required' }, { status: 400 });
    }

    // Determine status
    let newStatus = 'unconfigured';
    if (config && Object.keys(config).length > 0) {
      newStatus = is_enabled ? 'active' : 'paused';
    } else if (!is_enabled) {
      newStatus = 'paused';
    }

    const res = await query(
      `UPDATE marketing_integrations 
       SET is_enabled = COALESCE($1, is_enabled),
           config = COALESCE($2, config),
           status = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [
        is_enabled !== undefined ? is_enabled : null,
        config ? JSON.stringify(config) : null,
        newStatus,
        id,
      ]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    // Activity log
    await query(
      `INSERT INTO activity_logs (user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, 'UPDATE_MARKETING_INTEGRATION', 'marketing_integration', $2, $3)`,
      [
        auth.user?.name || 'Admin',
        String(id),
        JSON.stringify({ platform: res.rows[0].platform, is_enabled }),
      ]
    );

    return NextResponse.json({ success: true, integration: res.rows[0] });
  } catch (err: any) {
    console.error('Error updating marketing integration:', err);
    return NextResponse.json({ error: 'Failed to update integration' }, { status: 500 });
  }
}
