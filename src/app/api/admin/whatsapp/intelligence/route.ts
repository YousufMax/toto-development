import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '30d';
    const agentIdParam = searchParams.get('agentId');
    const targetAgentId = agentIdParam ? parseInt(agentIdParam, 10) : null;

    // Build date filter
    let dateCondition = ``;
    if (period === 'today') {
      dateCondition = `AND c.created_at >= CURRENT_DATE`;
    } else if (period === 'yesterday') {
      dateCondition = `AND c.created_at >= CURRENT_DATE - INTERVAL '1 day' AND c.created_at < CURRENT_DATE`;
    } else if (period === '7d') {
      dateCondition = `AND c.created_at >= CURRENT_DATE - INTERVAL '7 days'`;
    } else if (period === '30d') {
      dateCondition = `AND c.created_at >= CURRENT_DATE - INTERVAL '30 days'`;
    }

    // Check WhatsApp Business Platform integration status
    const waIntegrationRes = await query(
      `SELECT is_enabled, status, config FROM marketing_integrations WHERE platform = 'whatsapp_business'`
    );
    const isWaBusinessConnected =
      waIntegrationRes.rows.length > 0 &&
      waIntegrationRes.rows[0].is_enabled &&
      waIntegrationRes.rows[0].status === 'active';

    // 1. Fetch Agent Performance Overview
    const agentsRes = await query(`
      SELECT 
        a.id,
        a.agent_name,
        a.phone_number,
        a.status,
        a.is_default,
        a.is_fallback,
        a.total_clicks as lifetime_clicks,
        a.last_active_at,
        (
          SELECT string_agg(s.start_time || '–' || s.end_time || ' (' || s.day_of_week || ')', ', ')
          FROM whatsapp_schedules s
          WHERE s.agent_id = a.id AND s.is_active = true
        ) as assigned_schedule,
        COALESCE(
          (SELECT COUNT(*) FROM whatsapp_clicks c WHERE c.agent_id = a.id ${dateCondition}), 
          0
        ) as range_clicks,
        COALESCE(
          (SELECT COUNT(DISTINCT COALESCE(c.session_id, c.ip_address)) 
           FROM whatsapp_clicks c WHERE c.agent_id = a.id ${dateCondition}), 
          0
        ) as unique_clickers,
        COALESCE(
          (SELECT COUNT(*) FROM purchase_requests p 
           WHERE p.whatsapp_number = a.phone_number OR p.event_id IN (
             SELECT c2.event_id FROM whatsapp_clicks c2 WHERE c2.agent_id = a.id AND c2.event_id IS NOT NULL
           )),
          0
        ) as verified_conversions
      FROM whatsapp_agents a
      WHERE a.is_deleted = false
      ORDER BY a.is_default DESC, a.total_clicks DESC, a.id ASC
    `);

    const agentMetrics = agentsRes.rows.map((row) => {
      const clicks = parseInt(row.range_clicks, 10);
      const conversions = parseInt(row.verified_conversions, 10);
      const conversionRate = clicks > 0 ? ((conversions / clicks) * 100).toFixed(1) : '0.0';

      return {
        id: row.id,
        agentName: row.agent_name,
        phoneNumber: row.phone_number,
        status: row.status,
        isDefault: row.is_default,
        isFallback: row.is_fallback,
        assignedSchedule: row.assigned_schedule || 'Unassigned (On Demand)',
        lifetimeClicks: parseInt(row.lifetime_clicks, 10),
        rangeClicks: clicks,
        uniqueClickers: parseInt(row.unique_clickers, 10),
        conversationsCount: isWaBusinessConnected ? row.unique_clickers : null,
        verifiedConversions: conversions,
        conversionRate: `${conversionRate}%`,
        lastActiveAt: row.last_active_at,
      };
    });

    // 2. Deep Dive Analytics for specific agent or aggregate
    let targetCondition = targetAgentId ? `AND c.agent_id = ${targetAgentId}` : ``;

    // A. Daily click trends
    const dailyTrendRes = await query(`
      SELECT 
        TO_CHAR(c.created_at, 'YYYY-MM-DD') as day,
        COUNT(*) as clicks,
        COUNT(DISTINCT COALESCE(c.session_id, c.ip_address)) as unique_visitors
      FROM whatsapp_clicks c
      WHERE c.created_at >= CURRENT_DATE - INTERVAL '14 days' ${targetCondition}
      GROUP BY TO_CHAR(c.created_at, 'YYYY-MM-DD')
      ORDER BY day ASC
    `);

    // B. Source breakdown (Floating button, Package card, Exit popup, etc.)
    const sourceBreakdownRes = await query(`
      SELECT 
        COALESCE(c.source, 'Direct Trigger') as source,
        COUNT(*) as count
      FROM whatsapp_clicks c
      WHERE 1=1 ${dateCondition} ${targetCondition}
      GROUP BY c.source
      ORDER BY count DESC
      LIMIT 10
    `);

    // C. Device category distribution
    const deviceRes = await query(`
      SELECT 
        COALESCE(c.device_category, 'desktop') as device,
        COUNT(*) as count
      FROM whatsapp_clicks c
      WHERE 1=1 ${dateCondition} ${targetCondition}
      GROUP BY c.device_category
      ORDER BY count DESC
    `);

    // D. Hourly breakdown (00 to 23 Dhaka hour)
    const hourlyRes = await query(`
      SELECT 
        EXTRACT(HOUR FROM c.created_at) as hour,
        COUNT(*) as count
      FROM whatsapp_clicks c
      WHERE 1=1 ${dateCondition} ${targetCondition}
      GROUP BY EXTRACT(HOUR FROM c.created_at)
      ORDER BY hour ASC
    `);

    // E. Top landing pages generating WhatsApp clicks
    const topPagesRes = await query(`
      SELECT 
        COALESCE(c.page_url, 'Homepage') as page_url,
        COUNT(*) as count
      FROM whatsapp_clicks c
      WHERE 1=1 ${dateCondition} ${targetCondition}
      GROUP BY c.page_url
      ORDER BY count DESC
      LIMIT 6
    `);

    // F. Recent click log
    const recentClicksRes = await query(`
      SELECT 
        c.id,
        c.phone_number,
        c.source,
        c.page_url,
        c.utm_source,
        c.utm_medium,
        c.utm_campaign,
        c.device_category,
        c.created_at,
        a.agent_name
      FROM whatsapp_clicks c
      LEFT JOIN whatsapp_agents a ON c.agent_id = a.id
      WHERE 1=1 ${targetCondition}
      ORDER BY c.created_at DESC
      LIMIT 25
    `);

    return NextResponse.json({
      success: true,
      period,
      isWaBusinessConnected,
      agents: agentMetrics,
      deepDive: {
        dailyTrend: dailyTrendRes.rows,
        sourceBreakdown: sourceBreakdownRes.rows,
        deviceDistribution: deviceRes.rows,
        hourlyDistribution: hourlyRes.rows,
        topPages: topPagesRes.rows,
        recentClicks: recentClicksRes.rows,
      },
    });
  } catch (err: any) {
    console.error('Error fetching WhatsApp intelligence:', err);
    return NextResponse.json({ error: 'Failed to fetch WhatsApp intelligence metrics' }, { status: 500 });
  }
}
