// Role Types
export type OrganizationRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'WON' | 'LOST';
export type TransactionType = 'INCOME' | 'EXPENSE';
export type SubscriptionPlan = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING';
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'INVITE' | 'REMOVE' | 'ROLE_CHANGE' | 'LOGIN' | 'LOGOUT';
export type AuditModule = 'ORGANIZATION' | 'MEMBERS' | 'CRM' | 'FINANCE' | 'SUBSCRIPTION' | 'SETTINGS';

// User Entity
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: OrganizationRole;
  organizationId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'INVITED';
  joinedAt: string;
}

// Organization Entity
export interface Organization {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  industry?: string;
  memberCount: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

// Lead Entity (CRM)
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  assignedToId?: string;
  organizationId: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Finance Transaction
export interface FinanceTransaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
  organizationId: string;
  createdById: string;
  date: string;
  createdAt: string;
}

// Monthly Finance Summary
export interface MonthlySummary {
  month: string;
  year: number;
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
}

// Subscription
export interface Subscription {
  id: string;
  organizationId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  renewalDate?: string;
  price: number;
}

// Subscription History Entry
export interface SubscriptionHistory {
  id: string;
  subscriptionId: string;
  organizationId: string;
  oldPlan: SubscriptionPlan;
  newPlan: SubscriptionPlan;
  changedAt: string;
  changedBy: string;
}

// Audit Log
export interface AuditLog {
  id: string;
  organizationId: string;
  userId: string;
  userEmail: string;
  action: AuditAction;
  module: AuditModule;
  resourceId?: string;
  resourceType?: string;
  changes?: Record<string, any>;
  timestamp: string;
}

// Invitation
export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role: OrganizationRole;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  invitedBy: string;
  createdAt: string;
  expiresAt: string;
}

// Auth Context Types
export interface AuthContextType {
  currentUser: User | null;
  organizations: Organization[];
  currentOrganization: Organization | null;
  loading: boolean;
  switchOrganization: (orgId: string) => void;
  logout: () => void;
}

// Permission Types
export interface PermissionSet {
  canManageOrganization: boolean;
  canManageMembers: boolean;
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canChangeRoles: boolean;
  canAccessCRM: boolean;
  canEditCRM: boolean;
  canAccessFinance: boolean;
  canEditFinance: boolean;
  canViewSubscription: boolean;
  canViewAuditLogs: boolean;
  canAccessSettings: boolean;
}
