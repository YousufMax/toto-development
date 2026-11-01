import { NextRequest, NextResponse } from 'next/server';
import { resolveActiveWhatsAppNumber } from '@/lib/whatsapp-resolver';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const active = await resolveActiveWhatsAppNumber();
    return NextResponse.json(active, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
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
