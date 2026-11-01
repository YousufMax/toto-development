import { NextRequest, NextResponse } from 'next/server';
import { logWhatsAppClick } from '@/lib/whatsapp-resolver';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId, phoneNumber, pageUrl, source } = body;

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
    }

    await logWhatsAppClick({
      agentId,
      phoneNumber,
      pageUrl,
      source,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Click tracking error:', err);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
