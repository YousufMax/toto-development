import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const res = await query(
      'SELECT section_key, section_group, content_value, meta_json FROM website_content WHERE is_published = true'
    );

    const map: Record<string, string> = {};
    for (const row of res.rows) {
      map[row.section_key] = row.content_value;
    }

    return NextResponse.json(map, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    console.error('Error fetching public content blocks:', err);
    return NextResponse.json({}, { status: 200 });
  }
}
