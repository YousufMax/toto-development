import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';
import { getDhakaTime } from '@/lib/whatsapp-resolver';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const schedulesRes = await query(`
      SELECT 
        s.*,
        a.agent_name,
        a.phone_number,
        a.status as agent_status,
        a.is_default,
        a.is_fallback
      FROM whatsapp_schedules s
      JOIN whatsapp_agents a ON s.agent_id = a.id
      ORDER BY 
        CASE s.day_of_week
          WHEN 'all' THEN 1
          WHEN 'monday' THEN 2
          WHEN 'tuesday' THEN 3
          WHEN 'wednesday' THEN 4
          WHEN 'thursday' THEN 5
          WHEN 'friday' THEN 6
          WHEN 'saturday' THEN 7
          WHEN 'sunday' THEN 8
          ELSE 9
        END,
        s.start_time ASC
    `);

    // Fetch current override status if any
    const overrideRes = await query(
      `SELECT content_value, meta_json FROM website_content WHERE section_key = 'whatsapp_manual_override'`
    );

    const dhakaTime = getDhakaTime();

    return NextResponse.json({
      schedules: schedulesRes.rows,
      manualOverride: overrideRes.rows[0]?.meta_json || { enabled: false, agent_id: null },
      dhakaTime,
    });
  } catch (err: any) {
    console.error('Error fetching schedules:', err);
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('error' in auth) return auth.error;

  try {
    const body = await req.json();
    const {
      agent_id,
      day_of_week,
      start_time,
      end_time,
      timezone,
      is_active,
      is_overnight,
      priority,
    } = body;

    if (!agent_id || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Agent, start time, and end time are required.' },
        { status: 400 }
      );
    }

    const day = day_of_week || 'all';
    const computedOvernight = is_overnight || start_time > end_time;

    // Schedule Conflict Detection: Check if active schedule exists with overlapping times
    const conflictCheck = await query(
      `SELECT s.id, s.start_time, s.end_time, a.agent_name
       FROM whatsapp_schedules s
       JOIN whatsapp_agents a ON s.agent_id = a.id
       WHERE s.is_active = true 
         AND (s.day_of_week = 'all' OR s.day_of_week = $1 OR $1 = 'all')
         AND (
           -- direct overlap check
           (s.start_time < $3 AND s.end_time > $2)
         )`,
      [day, start_time, end_time]
    );

    let conflictWarning = null;
    if (conflictCheck.rows.length > 0) {
      conflictWarning = `Notice: This slot overlaps with ${conflictCheck.rows[0].agent_name} (${conflictCheck.rows[0].start_time} - ${conflictCheck.rows[0].end_time}). Priority will determine routing.`;
    }

    const res = await query(
      `INSERT INTO whatsapp_schedules (
        agent_id, day_of_week, start_time, end_time, timezone,
        is_active, is_overnight, priority
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        agent_id,
        day,
        start_time,
        end_time,
        timezone || 'Asia/Dhaka',
        is_active !== undefined ? !!is_active : true,
        computedOvernight,
        priority || 1,
      ]
    );

    await query(
      `INSERT INTO activity_logs (user_id, user_name, action_type, entity_type, entity_id, details)
       VALUES ($1, $2, 'CREATE_WHATSAPP_SCHEDULE', 'whatsapp_schedule', $3, $4)`,
      [
        auth.session.id,
        auth.session.name,
        res.rows[0].id.toString(),
        JSON.stringify({ agentId: agent_id, timeSlot: `${start_time}-${end_time}`, day }),
      ]
    );

    return NextResponse.json({
      schedule: res.rows[0],
      warning: conflictWarning,
    }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating schedule:', err);
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
  }
}
