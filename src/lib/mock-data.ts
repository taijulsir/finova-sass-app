import {
  User,
  Organization,
  Lead,
  FinanceTransaction,
  Subscription,
  SubscriptionHistory,
  AuditLog,
  MonthlySummary,
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@company.com',
    avatar: 'AJ',
    role: 'OWNER',
    organizationId: 'org-1',
    status: 'ACTIVE',
    joinedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Admin',
    email: 'sarah@company.com',
    avatar: 'SA',
    role: 'ADMIN',
    organizationId: 'org-1',
    status: 'ACTIVE',
    joinedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Mike Member',
    email: 'mike@company.com',
    avatar: 'MM',
    role: 'MEMBER',
    organizationId: 'org-1',
    status: 'ACTIVE',
    joinedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '4',
    name: 'Emma Sales',
    email: 'emma@company.com',
    avatar: 'ES',
    role: 'MEMBER',
    organizationId: 'org-1',
    status: 'ACTIVE',
    joinedAt: '2024-03-15T10:00:00Z',
  },
];

// Mock Organization
export const mockOrganization: Organization = {
  id: 'org-1',
  name: 'Tech Innovations Inc',
  logo: 'TI',
  website: 'https://techinnovations.com',
  description: 'Leading innovation in tech solutions',
  industry: 'Technology',
  memberCount: 4,
  ownerId: '1',
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-12-01T10:00:00Z',
};

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'John Company LLC',
    email: 'contact@johncompany.com',
    phone: '+1-555-0101',
    company: 'John Company LLC',
    status: 'NEW',
    assignedToId: '2',
    organizationId: 'org-1',
    notes: 'Initial contact made',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'lead-2',
    name: 'Sarah Ventures',
    email: 'sarah@ventures.com',
    phone: '+1-555-0102',
    company: 'Ventures Corp',
    status: 'CONTACTED',
    assignedToId: '3',
    organizationId: 'org-1',
    notes: 'Follow-up scheduled',
    createdAt: '2024-11-25T10:00:00Z',
    updatedAt: '2024-12-05T10:00:00Z',
  },
  {
    id: 'lead-3',
    name: 'Michael Industries',
    email: 'michael@industries.com',
    phone: '+1-555-0103',
    company: 'Industries Global',
    status: 'WON',
    assignedToId: '2',
    organizationId: 'org-1',
    notes: 'Deal closed - $50,000 contract',
    createdAt: '2024-10-15T10:00:00Z',
    updatedAt: '2024-11-30T10:00:00Z',
  },
  {
    id: 'lead-4',
    name: 'Lisa Enterprises',
    email: 'lisa@enterprises.com',
    phone: '+1-555-0104',
    company: 'Enterprises United',
    status: 'LOST',
    assignedToId: '4',
    organizationId: 'org-1',
    notes: 'Budget constraints',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-12-02T10:00:00Z',
  },
  {
    id: 'lead-5',
    name: 'David Solutions',
    email: 'david@solutions.com',
    phone: '+1-555-0105',
    company: 'Solutions Pro',
    status: 'NEW',
    assignedToId: '3',
    organizationId: 'org-1',
    notes: 'Inbound inquiry',
    createdAt: '2024-12-10T10:00:00Z',
    updatedAt: '2024-12-10T10:00:00Z',
  },
];

// Mock Finance Transactions
export const mockFinanceTransactions: FinanceTransaction[] = [
  {
    id: 'txn-1',
    type: 'INCOME',
    category: 'Sales',
    amount: 50000,
    description: 'Contract with Industries Global',
    organizationId: 'org-1',
    createdById: '2',
    date: '2024-11-30T10:00:00Z',
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'txn-2',
    type: 'INCOME',
    category: 'Consulting',
    amount: 15000,
    description: 'Consulting services rendered',
    organizationId: 'org-1',
    createdById: '2',
    date: '2024-12-05T10:00:00Z',
    createdAt: '2024-12-05T10:00:00Z',
  },
  {
    id: 'txn-3',
    type: 'EXPENSE',
    category: 'Salaries',
    amount: 25000,
    description: 'Monthly salaries',
    organizationId: 'org-1',
    createdById: '1',
    date: '2024-12-01T10:00:00Z',
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'txn-4',
    type: 'EXPENSE',
    category: 'Software',
    amount: 5000,
    description: 'SaaS subscriptions',
    organizationId: 'org-1',
    createdById: '1',
    date: '2024-12-01T10:00:00Z',
    createdAt: '2024-12-01T10:00:00Z',
  },
  {
    id: 'txn-5',
    type: 'EXPENSE',
    category: 'Marketing',
    amount: 8000,
    description: 'Digital marketing campaign',
    organizationId: 'org-1',
    createdById: '1',
    date: '2024-12-08T10:00:00Z',
    createdAt: '2024-12-08T10:00:00Z',
  },
  {
    id: 'txn-6',
    type: 'INCOME',
    category: 'Support',
    amount: 5000,
    description: 'Support contract renewal',
    organizationId: 'org-1',
    createdById: '2',
    date: '2024-12-10T10:00:00Z',
    createdAt: '2024-12-10T10:00:00Z',
  },
];

// Mock Monthly Summary
export const mockMonthlySummaries: MonthlySummary[] = [
  {
    month: 'October',
    year: 2024,
    totalIncome: 45000,
    totalExpense: 35000,
    netProfit: 10000,
  },
  {
    month: 'November',
    year: 2024,
    totalIncome: 65000,
    totalExpense: 38000,
    netProfit: 27000,
  },
  {
    month: 'December',
    year: 2024,
    totalIncome: 70000,
    totalExpense: 40000,
    netProfit: 30000,
  },
];

// Mock Subscription
export const mockSubscription: Subscription = {
  id: 'sub-1',
  organizationId: 'org-1',
  plan: 'PROFESSIONAL',
  status: 'ACTIVE',
  startDate: '2024-01-01T10:00:00Z',
  endDate: '2025-01-01T10:00:00Z',
  renewalDate: '2025-01-01T10:00:00Z',
  price: 999,
};

// Mock Subscription History
export const mockSubscriptionHistory: SubscriptionHistory[] = [
  {
    id: 'sh-1',
    subscriptionId: 'sub-1',
    organizationId: 'org-1',
    oldPlan: 'STARTER',
    newPlan: 'PROFESSIONAL',
    changedAt: '2024-06-15T10:00:00Z',
    changedBy: 'alex@company.com',
  },
  {
    id: 'sh-2',
    subscriptionId: 'sub-1',
    organizationId: 'org-1',
    oldPlan: 'PROFESSIONAL',
    newPlan: 'PROFESSIONAL',
    changedAt: '2024-01-01T10:00:00Z',
    changedBy: 'alex@company.com',
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    organizationId: 'org-1',
    userId: '2',
    userEmail: 'sarah@company.com',
    action: 'CREATE',
    module: 'CRM',
    resourceId: 'lead-5',
    resourceType: 'Lead',
    timestamp: '2024-12-10T10:00:00Z',
  },
  {
    id: 'audit-2',
    organizationId: 'org-1',
    userId: '1',
    userEmail: 'alex@company.com',
    action: 'UPDATE',
    module: 'ORGANIZATION',
    resourceType: 'Organization',
    changes: { name: 'Tech Innovations Inc' },
    timestamp: '2024-12-09T10:00:00Z',
  },
  {
    id: 'audit-3',
    organizationId: 'org-1',
    userId: '1',
    userEmail: 'alex@company.com',
    action: 'INVITE',
    module: 'MEMBERS',
    resourceType: 'User',
    changes: { email: 'emma@company.com', role: 'MEMBER' },
    timestamp: '2024-12-08T10:00:00Z',
  },
  {
    id: 'audit-4',
    organizationId: 'org-1',
    userId: '2',
    userEmail: 'sarah@company.com',
    action: 'CREATE',
    module: 'FINANCE',
    resourceType: 'Transaction',
    changes: { type: 'INCOME', amount: 5000 },
    timestamp: '2024-12-05T10:00:00Z',
  },
  {
    id: 'audit-5',
    organizationId: 'org-1',
    userId: '1',
    userEmail: 'alex@company.com',
    action: 'ROLE_CHANGE',
    module: 'MEMBERS',
    resourceId: '3',
    resourceType: 'User',
    changes: { oldRole: 'ADMIN', newRole: 'MEMBER' },
    timestamp: '2024-12-01T10:00:00Z',
  },
];

// Helper functions for mock data
export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find((l) => l.id === id);
}

export function getTransactionById(id: string): FinanceTransaction | undefined {
  return mockFinanceTransactions.find((t) => t.id === id);
}

export function calculateFinanceSummary(month?: string) {
  if (month) {
    return mockMonthlySummaries.find((s) => s.month === month);
  }

  const total = mockMonthlySummaries.reduce(
    (acc, s) => {
      acc.totalIncome += s.totalIncome;
      acc.totalExpense += s.totalExpense;
      acc.netProfit += s.netProfit;
      return acc;
    },
    { totalIncome: 0, totalExpense: 0, netProfit: 0 }
  );

  return total;
}
