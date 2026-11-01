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
    const q = searchParams.get('q')?.trim() || '';

    if (!q || q.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const pattern = `%${q}%`;

    // 1. WhatsApp Agents
    const agentsRes = await query(
      `SELECT id, agent_name, phone_number, status 
       FROM whatsapp_agents 
       WHERE is_deleted = false AND (agent_name ILIKE $1 OR phone_number ILIKE $1)
       LIMIT 4`,
      [pattern]
    );

    // 2. Packages
    const packagesRes = await query(
      `SELECT id, title, category, regular_price, currency_symbol 
       FROM packages 
       WHERE title ILIKE $1 OR category ILIKE $1
       LIMIT 4`,
      [pattern]
    );

    // 3. Coupons
    const couponsRes = await query(
      `SELECT id, code, discount_type, discount_value, is_active 
       FROM coupons 
       WHERE code ILIKE $1 OR notes ILIKE $1
       LIMIT 4`,
      [pattern]
    );

    // 4. Purchase Requests
    const purchaseRes = await query(
      `SELECT id, full_name, business_name, package_name, quoted_price, status 
       FROM purchase_requests 
       WHERE id ILIKE $1 OR full_name ILIKE $1 OR business_name ILIKE $1 OR email ILIKE $1 OR whatsapp_number ILIKE $1
       LIMIT 5`,
      [pattern]
    );

    const formattedResults = [
      ...agentsRes.rows.map((a) => ({
        type: 'whatsapp_agent',
        title: a.agent_name,
        subtitle: `${a.phone_number} • ${a.status}`,
        link: '/admin/whatsapp',
      })),
      ...packagesRes.rows.map((p) => ({
        type: 'package',
        title: p.title,
        subtitle: `${p.category} • ${p.currency_symbol || '৳'}${parseFloat(p.regular_price).toLocaleString()}`,
        link: '/admin/packages',
      })),
      ...couponsRes.rows.map((c) => ({
        type: 'coupon',
        title: c.code,
        subtitle: `${c.discount_type === 'percentage' ? c.discount_value + '%' : '৳' + c.discount_value} • ${c.is_active ? 'Active' : 'Inactive'}`,
        link: '/admin/coupons',
      })),
      ...purchaseRes.rows.map((pr) => ({
        type: 'purchase_request',
        title: `${pr.id} — ${pr.business_name}`,
        subtitle: `${pr.full_name} • ${pr.package_name} • ${pr.status}`,
        link: '/admin/purchase-requests',
      })),
    ];

    return NextResponse.json({ success: true, results: formattedResults });
  } catch (err: any) {
    console.error('Error in global admin search:', err);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
