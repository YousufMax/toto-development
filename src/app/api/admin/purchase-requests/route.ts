import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const packageId = searchParams.get('packageId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    const offset = (page - 1) * limit;

    let sql = `
      SELECT 
        pr.*,
        u.name as assigned_agent_name
      FROM purchase_requests pr
      LEFT JOIN admin_users u ON pr.assigned_agent_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== 'all') {
      params.push(status);
      sql += ` AND pr.status = $${params.length}`;
    }

    if (packageId && packageId !== 'all') {
      params.push(packageId);
      sql += ` AND pr.package_id = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.trim()}%`);
      sql += ` AND (
        pr.full_name ILIKE $${params.length} OR 
        pr.business_name ILIKE $${params.length} OR 
        pr.whatsapp_number ILIKE $${params.length} OR 
        pr.email ILIKE $${params.length} OR 
        pr.id ILIKE $${params.length}
      )`;
    }

    // Total count query
    const countSql = `SELECT COUNT(*) as count FROM (${sql}) as sub`;
    const countRes = await query(countSql, params);
    const totalCount = parseInt(countRes.rows[0].count, 10);

    // Add pagination & sorting
    sql += ` ORDER BY pr.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const dataRes = await query(sql, params);

    // Also get quick status count summary for tabs
    const statusCountsRes = await query(`
      SELECT status, COUNT(*) as count 
      FROM purchase_requests 
      GROUP BY status
    `);

    return NextResponse.json({
      requests: dataRes.rows,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      statusCounts: statusCountsRes.rows,
    });
  } catch (err: any) {
    console.error('Error fetching purchase requests:', err);
    return NextResponse.json({ error: 'Failed to fetch purchase requests' }, { status: 500 });
  }
}
