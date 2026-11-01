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

    let dateInterval = "INTERVAL '30 days'";
    if (period === 'today') dateInterval = "INTERVAL '1 day'";
    else if (period === '7d') dateInterval = "INTERVAL '7 days'";

    // 1. Traffic Sources
    const trafficSourcesRes = await query(`
      SELECT 
        CASE 
          WHEN utm_source ILIKE '%facebook%' OR utm_source ILIKE '%fb%' OR utm_source ILIKE '%meta%' OR utm_source ILIKE '%instagram%' THEN 'Meta Ads (Facebook/Instagram)'
          WHEN utm_source ILIKE '%google%' THEN 'Google Search & Ads'
          WHEN utm_source ILIKE '%linkedin%' THEN 'LinkedIn'
          WHEN utm_source IS NOT NULL AND utm_source != '' THEN utm_source
          ELSE 'Direct / Organic'
        END as source_channel,
        COUNT(*) as total_visits
      FROM conversion_events
      WHERE created_at >= CURRENT_DATE - ${dateInterval}
      GROUP BY source_channel
      ORDER BY total_visits DESC
    `);

    // 2. Device Breakdown
    const devicesRes = await query(`
      SELECT 
        COALESCE(device_category, 'desktop') as device,
        COUNT(*) as count
      FROM conversion_events
      WHERE created_at >= CURRENT_DATE - ${dateInterval}
      GROUP BY device_category
      ORDER BY count DESC
    `);

    // 3. Top Landing Pages
    const landingPagesRes = await query(`
      SELECT 
        COALESCE(page_url, '/') as page_url,
        COUNT(*) as views,
        COUNT(CASE WHEN event_name = 'whatsapp_click' THEN 1 END) as whatsapp_contacts,
        COUNT(CASE WHEN event_name = 'purchase_request' THEN 1 END) as purchase_leads
      FROM conversion_events
      WHERE created_at >= CURRENT_DATE - ${dateInterval}
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 12
    `);

    // 4. UTM Campaigns
    const utmCampaignsRes = await query(`
      SELECT 
        COALESCE(utm_source, 'direct') as utm_source,
        COALESCE(utm_medium, 'none') as utm_medium,
        COALESCE(utm_campaign, 'organic_direct') as utm_campaign,
        COUNT(*) as total_clicks,
        COUNT(CASE WHEN event_name = 'purchase_request' THEN 1 END) as leads_count
      FROM conversion_events
      WHERE created_at >= CURRENT_DATE - ${dateInterval}
      GROUP BY utm_source, utm_medium, utm_campaign
      ORDER BY total_clicks DESC
      LIMIT 25
    `);

    return NextResponse.json({
      success: true,
      period,
      sources: trafficSourcesRes.rows,
      devices: devicesRes.rows,
      landingPages: landingPagesRes.rows,
      campaigns: utmCampaignsRes.rows,
    });
  } catch (err: any) {
    console.error('Error in visitor analytics API:', err);
    return NextResponse.json({ error: 'Failed to fetch visitor analytics' }, { status: 500 });
  }
}
