import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const res = await query(
      `SELECT platform, config FROM marketing_integrations WHERE is_enabled = true`
    );

    const publicConfig: {
      metaPixelId?: string;
      gtmContainerId?: string;
      ga4MeasurementId?: string;
      googleAdsId?: string;
    } = {};

    for (const row of res.rows) {
      const cfg = row.config || {};
      if (row.platform === 'meta_pixel' && cfg.pixel_id) {
        publicConfig.metaPixelId = cfg.pixel_id;
      }
      if (row.platform === 'gtm' && cfg.container_id) {
        publicConfig.gtmContainerId = cfg.container_id;
      }
      if (row.platform === 'ga4' && cfg.measurement_id) {
        publicConfig.ga4MeasurementId = cfg.measurement_id;
      }
      if (row.platform === 'google_ads' && cfg.conversion_id) {
        publicConfig.googleAdsId = cfg.conversion_id;
      }
    }

    return NextResponse.json(publicConfig, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (e) {
    return NextResponse.json({});
  }
}
