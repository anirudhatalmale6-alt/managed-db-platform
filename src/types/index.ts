export type UserRole = 'admin' | 'customer' | 'subuser';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
  createdAt: Date;
  emailVerified: boolean;
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
}

export type DatabaseType = 'mysql' | 'postgresql' | 'mongodb' | 'redis' | 'elasticsearch';

export type DatabaseStatus = 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed';

export interface Database {
  id: string;
  name: string;
  type: DatabaseType;
  status: DatabaseStatus;
  version: string;
  region: string;
  plan: string;
  storage: number;
  ram: number;
  cpu: number;
  connectionString?: string;
  host?: string;
  port?: number;
  username?: string;
  createdAt: Date;
  organizationId: string;
}

export interface DatabasePlan {
  id: string;
  name: string;
  storage: number;
  ram: number;
  cpu: number;
  priceMonthly: number;
  priceHourly: number;
}

export interface Subscription {
  id: string;
  organizationId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeSubscriptionId?: string;
}

export interface Invoice {
  id: string;
  organizationId: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  createdAt: Date;
  paidAt?: Date;
  stripeInvoiceId?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  ipAddress?: string;
}
