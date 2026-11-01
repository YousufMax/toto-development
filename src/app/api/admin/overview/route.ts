import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';
import { resolveActiveWhatsAppNumber } from '@/lib/whatsapp-resolver';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    // 1. Total Enquiries & Leads
    const totalRequestsRes = await query('SELECT COUNT(*) as count FROM purchase_requests');
    const newLeadsRes = await query(
      "SELECT COUNT(*) as count FROM purchase_requests WHERE status = 'new_request'"
    );
    const pendingRequestsRes = await query(
      "SELECT COUNT(*) as count FROM purchase_requests WHERE status IN ('new_request', 'contacted', 'discussion')"
    );
    const generalEnquiriesRes = await query('SELECT COUNT(*) as count FROM website_enquiries');

    // 2. Packages & Discounts
    const totalPackagesRes = await query('SELECT COUNT(*) as count FROM packages WHERE is_active = true');
    const activeDiscountsRes = await query(
      'SELECT COUNT(*) as count FROM packages WHERE is_active = true AND is_discount_active = true'
    );

    // 3. Active WhatsApp Status (Real-Time)
    const activeWA = await resolveActiveWhatsAppNumber();

    // 4. WhatsApp Clicks
    const totalClicksRes = await query('SELECT COUNT(*) as count FROM whatsapp_clicks');
    const clicksTodayRes = await query(
      "SELECT COUNT(*) as count FROM whatsapp_clicks WHERE created_at >= CURRENT_DATE"
    );
    const clicksBySourceRes = await query(`
      SELECT source, COUNT(*) as count 
      FROM whatsapp_clicks 
      GROUP BY source 
      ORDER BY count DESC 
      LIMIT 6
    `);

    // 5. Package Performance (Enquiries per package)
    const packagePerfRes = await query(`
      SELECT package_name, COUNT(*) as request_count, SUM(quoted_price) as potential_revenue
      FROM purchase_requests
      GROUP BY package_name
      ORDER BY request_count DESC
      LIMIT 5
    `);

    // 6. Lead Status Pipeline breakdown
    const pipelineRes = await query(`
      SELECT status, COUNT(*) as count 
      FROM purchase_requests 
      GROUP BY status
    `);

    // 7. Recent Customer Activities (Last 8 requests)
    const recentRequestsRes = await query(`
      SELECT id, full_name, business_name, package_name, quoted_price, currency, status, created_at
      FROM purchase_requests
      ORDER BY created_at DESC
      LIMIT 8
    `);

    // 8. Recent Audit Logs (Last 6 logs)
    const recentLogsRes = await query(`
      SELECT id, user_name, action_type, entity_type, entity_id, created_at
      FROM activity_logs
      ORDER BY created_at DESC
      LIMIT 6
    `);

    return NextResponse.json({
      metrics: {
        totalEnquiries: parseInt(totalRequestsRes.rows[0].count, 10) + parseInt(generalEnquiriesRes.rows[0].count, 10),
        newLeads: parseInt(newLeadsRes.rows[0].count, 10),
        pendingRequests: parseInt(pendingRequestsRes.rows[0].count, 10),
        totalPackages: parseInt(totalPackagesRes.rows[0].count, 10),
        activeDiscounts: parseInt(activeDiscountsRes.rows[0].count, 10),
        totalWhatsAppClicks: parseInt(totalClicksRes.rows[0].count, 10),
        whatsAppClicksToday: parseInt(clicksTodayRes.rows[0].count, 10),
      },
      activeWhatsApp: activeWA,
      clicksBySource: clicksBySourceRes.rows,
      packagePerformance: packagePerfRes.rows,
      pipeline: pipelineRes.rows,
      recentRequests: recentRequestsRes.rows,
      recentLogs: recentLogsRes.rows,
    });
  } catch (err: any) {
    console.error('Overview API error:', err);
    return NextResponse.json({ error: 'Failed to load dashboard overview data' }, { status: 500 });
  }
}
