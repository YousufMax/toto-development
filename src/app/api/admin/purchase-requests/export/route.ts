import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const res = await query(`
      SELECT 
        pr.id,
        pr.created_at,
        pr.full_name,
        pr.business_name,
        pr.whatsapp_number,
        pr.email,
        pr.package_name,
        pr.package_category,
        pr.quoted_price,
        pr.currency,
        pr.status,
        pr.preferred_contact_method,
        pr.website_or_social,
        pr.project_requirements,
        pr.internal_notes,
        u.name as assigned_agent
      FROM purchase_requests pr
      LEFT JOIN admin_users u ON pr.assigned_agent_id = u.id
      ORDER BY pr.created_at DESC
    `);

    // Build CSV
    const headers = [
      'Request ID',
      'Date',
      'Customer Name',
      'Business / Company',
      'WhatsApp Number',
      'Email',
      'Package Name',
      'Category',
      'Quoted Price',
      'Currency',
      'Status',
      'Contact Method',
      'Assigned Agent',
      'Website / Social',
      'Requirements',
      'Internal Notes',
    ];

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = res.rows.map((r) => [
      escapeCsv(r.id),
      escapeCsv(new Date(r.created_at).toISOString()),
      escapeCsv(r.full_name),
      escapeCsv(r.business_name),
      escapeCsv(r.whatsapp_number),
      escapeCsv(r.email),
      escapeCsv(r.package_name),
      escapeCsv(r.package_category),
      escapeCsv(r.quoted_price),
      escapeCsv(r.currency),
      escapeCsv(r.status),
      escapeCsv(r.preferred_contact_method),
      escapeCsv(r.assigned_agent),
      escapeCsv(r.website_or_social),
      escapeCsv(r.project_requirements),
      escapeCsv(r.internal_notes),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="toto-purchase-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err: any) {
    console.error('CSV export error:', err);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
