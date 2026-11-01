import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'toto-development-agency-management-secret-key-2026-production-secure';

export interface AdminSession {
  id: number;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'sales_manager' | 'editor';
}

export function signToken(payload: AdminSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch (err) {
    return null;
  }
}

export async function getSession(req: NextRequest): Promise<AdminSession | null> {
  const token =
    req.cookies.get('toto_admin_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Verify user is still active in DB
  try {
    const res = await query(
      'SELECT id, email, name, role, is_active FROM admin_users WHERE id = $1',
      [decoded.id]
    );
    if (res.rows.length === 0 || !res.rows[0].is_active) {
      return null;
    }
    return {
      id: res.rows[0].id,
      email: res.rows[0].email,
      name: res.rows[0].name,
      role: res.rows[0].role,
    };
  } catch (e) {
    return null;
  }
}

export async function requireAdmin(
  req: NextRequest,
  allowedRoles: string[] = ['super_admin', 'admin', 'sales_manager', 'editor']
): Promise<{ session: AdminSession } | { error: NextResponse }> {
  const session = await getSession(req);

  if (!session) {
    return {
      error: NextResponse.json(
        { error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      ),
    };
  }

  if (!allowedRoles.includes(session.role)) {
    return {
      error: NextResponse.json(
        { error: 'Forbidden: Insufficient privileges' },
        { status: 403 }
      ),
    };
  }

  return { session };
}

export async function verifyAuth(req: NextRequest): Promise<{ authenticated: boolean; user: AdminSession | null }> {
  const session = await getSession(req);
  return { authenticated: !!session, user: session };
}
