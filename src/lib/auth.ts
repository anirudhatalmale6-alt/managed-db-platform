import { cookies } from 'next/headers';
import { User, UserRole } from '@/types';

// In production, use a proper database and JWT library
// This is a simplified implementation for demonstration

const SESSION_COOKIE = 'clouddb_session';

// Simulated user storage (replace with database in production)
const users: Map<string, User & { password: string }> = new Map();

// Add demo users
users.set('admin@clouddb.com', {
  id: '1',
  email: 'admin@clouddb.com',
  name: 'Admin User',
  role: 'admin',
  password: 'Admin123!',
  createdAt: new Date(),
  emailVerified: true,
});

users.set('demo@clouddb.com', {
  id: '2',
  email: 'demo@clouddb.com',
  name: 'Demo Customer',
  role: 'customer',
  organizationId: 'org_1',
  password: 'Demo123!',
  createdAt: new Date(),
  emailVerified: true,
});

// Session storage (replace with Redis/database in production)
const sessions: Map<string, { userId: string; expiresAt: Date }> = new Map();

export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or argon2
  return Buffer.from(password).toString('base64');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return Buffer.from(password).toString('base64') === hash;
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole = 'customer'
): Promise<User> {
  if (users.has(email)) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user: User & { password: string } = {
    id: generateSessionId(),
    email,
    name,
    role,
    password: hashedPassword,
    organizationId: role === 'customer' ? `org_${generateSessionId()}` : undefined,
    createdAt: new Date(),
    emailVerified: false,
  };

  users.set(email, user);

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.get(email);
  if (!user) return null;

  // For demo users, check plain password; for new users, check hashed
  const isValid = user.password === password || await verifyPassword(password, user.password);
  if (!isValid) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function createSession(userId: string): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  sessions.set(sessionId, { userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  return sessionId;
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) return null;

  const session = sessions.get(sessionId);
  if (!session || session.expiresAt < new Date()) {
    sessions.delete(sessionId);
    return null;
  }

  // Find user by ID
  for (const user of users.values()) {
    if (user.id === session.userId) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
  }

  return null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId) {
    sessions.delete(sessionId);
    cookieStore.delete(SESSION_COOKIE);
  }
}

export async function requireAuth(allowedRoles?: UserRole[]): Promise<User> {
  const user = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }

  return user;
}
