import { query } from './db';

export interface ActiveWhatsAppResult {
  agentId: number | null;
  agentName: string;
  phoneNumber: string;
  prefilledMessage: string;
  isScheduled: boolean;
  isOverride: boolean;
  scheduleDetails?: {
    startTime: string;
    endTime: string;
    timezone: string;
  };
  serverTimeDhaka: string;
}

export function getDhakaTime(): {
  timeStr: string; // "HH:MM"
  dayName: string; // "monday", "tuesday", etc.
  fullDateStr: string;
} {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
  });

  const fullFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return {
    timeStr: timeFormatter.format(now),
    dayName: dayFormatter.format(now).toLowerCase(),
    fullDateStr: fullFormatter.format(now),
  };
}

export async function resolveActiveWhatsAppNumber(): Promise<ActiveWhatsAppResult> {
  const { timeStr, dayName, fullDateStr } = getDhakaTime();

  try {
    // 1. Check for manual override in website_content
    const overrideRes = await query(
      `SELECT content_value, meta_json FROM website_content WHERE section_key = 'whatsapp_manual_override' AND is_published = true`
    );

    if (overrideRes.rows.length > 0) {
      const meta = overrideRes.rows[0].meta_json || {};
      if (meta.enabled && meta.agent_id) {
        // Fetch overridden agent
        const agentRes = await query(
          `SELECT id, agent_name, phone_number, custom_prefilled_message FROM whatsapp_agents WHERE id = $1 AND status != 'inactive'`,
          [meta.agent_id]
        );
        if (agentRes.rows.length > 0) {
          const ag = agentRes.rows[0];
          return {
            agentId: ag.id,
            agentName: ag.agent_name,
            phoneNumber: ag.phone_number,
            prefilledMessage:
              ag.custom_prefilled_message ||
              'Hi TOTO Development, I would like to consult on your agency services & packages.',
            isScheduled: false,
            isOverride: true,
            serverTimeDhaka: fullDateStr,
          };
        }
      }
    }

    // 2. Query active schedules & agents
    const schedulesRes = await query(`
      SELECT 
        s.id as schedule_id,
        s.agent_id,
        s.day_of_week,
        s.start_time,
        s.end_time,
        s.timezone,
        s.is_overnight,
        a.agent_name,
        a.phone_number,
        a.custom_prefilled_message,
        a.status as agent_status
      FROM whatsapp_schedules s
      JOIN whatsapp_agents a ON s.agent_id = a.id
      WHERE s.is_active = true AND a.status IN ('active', 'scheduled')
      ORDER BY s.priority DESC, s.id ASC
    `);

    // Match schedule
    for (const sc of schedulesRes.rows) {
      // Check day of week
      if (sc.day_of_week !== 'all' && sc.day_of_week !== dayName) {
        continue;
      }

      const isOvernight = sc.is_overnight || sc.start_time > sc.end_time;
      let isMatch = false;

      if (!isOvernight) {
        // Normal daytime schedule (e.g., 09:00 to 11:00)
        isMatch = timeStr >= sc.start_time && timeStr < sc.end_time;
      } else {
        // Overnight schedule (e.g., 21:00 to 09:00)
        isMatch = timeStr >= sc.start_time || timeStr < sc.end_time;
      }

      if (isMatch) {
        return {
          agentId: sc.agent_id,
          agentName: sc.agent_name,
          phoneNumber: sc.phone_number,
          prefilledMessage:
            sc.custom_prefilled_message ||
            'Hi TOTO Development, I would like to consult on your agency services & packages.',
          isScheduled: true,
          isOverride: false,
          scheduleDetails: {
            startTime: sc.start_time,
            endTime: sc.end_time,
            timezone: sc.timezone || 'Asia/Dhaka',
          },
          serverTimeDhaka: fullDateStr,
        };
      }
    }

    // 3. Fallback: Agent marked as fallback or default
    const fallbackRes = await query(`
      SELECT id, agent_name, phone_number, custom_prefilled_message 
      FROM whatsapp_agents 
      WHERE (is_fallback = true OR is_default = true) AND status != 'inactive'
      ORDER BY is_fallback DESC, is_default DESC
      LIMIT 1
    `);

    if (fallbackRes.rows.length > 0) {
      const ag = fallbackRes.rows[0];
      return {
        agentId: ag.id,
        agentName: ag.agent_name,
        phoneNumber: ag.phone_number,
        prefilledMessage:
          ag.custom_prefilled_message ||
          'Hi TOTO Development, I would like to consult on your agency services & packages.',
        isScheduled: false,
        isOverride: false,
        serverTimeDhaka: fullDateStr,
      };
    }

    // 4. Default system fallback from environment
    const defaultPhone = process.env.FALLBACK_WHATSAPP || process.env.DEFAULT_WHATSAPP || '+8801800942868';
    return {
      agentId: null,
      agentName: 'TOTO Development Senior Consultant',
      phoneNumber: defaultPhone,
      prefilledMessage: 'Hi TOTO Development, I would like to consult on your agency services & packages.',
      isScheduled: false,
      isOverride: false,
      serverTimeDhaka: fullDateStr,
    };
  } catch (err) {
    console.error('Error resolving active WhatsApp number:', err);
    return {
      agentId: null,
      agentName: 'TOTO Development Architect',
      phoneNumber: '+8801800942868',
      prefilledMessage: 'Hi TOTO Development, I would like to consult on your agency services & packages.',
      isScheduled: false,
      isOverride: false,
      serverTimeDhaka: fullDateStr,
    };
  }
}

export async function logWhatsAppClick(params: {
  agentId?: number | null;
  phoneNumber: string;
  pageUrl?: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  try {
    await query(
      `INSERT INTO whatsapp_clicks (agent_id, phone_number, page_url, source, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        params.agentId || null,
        params.phoneNumber,
        params.pageUrl || null,
        params.source || 'website_button',
        params.ipAddress || null,
        params.userAgent || null,
      ]
    );

    if (params.agentId) {
      await query(
        `UPDATE whatsapp_agents SET total_clicks = total_clicks + 1 WHERE id = $1`,
        [params.agentId]
      );
    }
  } catch (err) {
    console.error('Error logging WhatsApp click:', err);
  }
}
