import { NextRequest, NextResponse } from 'next/server';
import { resolveActiveWhatsAppNumber } from '@/lib/whatsapp-resolver';

export const dynamic = 'force-dynamic';

let cachedActive: any = null;
let lastResolvedTime = 0;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

export async function GET(req: NextRequest) {
  try {
    const now = Date.now();
    if (cachedActive && now - lastResolvedTime < CACHE_TTL_MS) {
      return NextResponse.json(cachedActive, {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      });
    }

    const active = await resolveActiveWhatsAppNumber();
    cachedActive = active;
    lastResolvedTime = now;

    return NextResponse.json(active, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (err: any) {
    console.error('Active WhatsApp route error:', err);
    return NextResponse.json(
      {
        agentId: null,
        agentName: 'TOTO Development Senior Consultant',
        phoneNumber: '+8801800942868',
        prefilledMessage: 'Hi TOTO Development, I would like to consult on your agency services & packages.',
        isScheduled: false,
        isOverride: false,
        serverTimeDhaka: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
