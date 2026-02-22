'use client';

import React from 'react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import { StatsCard } from '@/components/ui-system/layout/StatsCard';
import { mockSubscription, mockSubscriptionHistory, mockUsers } from '@/lib/mock-data';
import { Badge } from 'lucide-react';

export default function SubscriptionPage() {
  const statusColor = {
    ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    EXPIRED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  };

  const planPrices = {
    STARTER: 99,
    PROFESSIONAL: 999,
    ENTERPRISE: 4999,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscription"
        description="Manage your plan and billing"
      />

      {/* Current Plan */}
      <SectionCard title="Current Plan">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            label="Plan"
            value={mockSubscription.plan}
            icon={<Badge className="h-6 w-6" />}
          />
          <StatsCard
            label="Status"
            value={mockSubscription.status}
            icon={
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColor[mockSubscription.status]
                }`}
              >
                {mockSubscription.status}
              </div>
            }
          />
          <StatsCard
            label="Monthly Cost"
            value={`$${mockSubscription.price}`}
          />
          <StatsCard
            label="Renewal Date"
            value={new Date(mockSubscription.renewalDate || '').toLocaleDateString()}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Start Date</p>
            <p className="text-lg font-semibold">
              {new Date(mockSubscription.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">End Date</p>
            <p className="text-lg font-semibold">
              {new Date(mockSubscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Plan Details */}
      <SectionCard title="Plan Features">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockSubscription.plan === 'STARTER' && (
            <>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Up to 10 Users</p>
                  <p className="text-sm text-muted-foreground">Team members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Basic CRM</p>
                  <p className="text-sm text-muted-foreground">Lead management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Finance Tracking</p>
                  <p className="text-sm text-muted-foreground">Income & expenses</p>
                </div>
              </div>
            </>
          )}
          {mockSubscription.plan === 'PROFESSIONAL' && (
            <>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Up to 50 Users</p>
                  <p className="text-sm text-muted-foreground">Team members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Advanced CRM</p>
                  <p className="text-sm text-muted-foreground">Full pipeline management</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Finance Pro</p>
                  <p className="text-sm text-muted-foreground">Analytics & reports</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Audit Logs</p>
                  <p className="text-sm text-muted-foreground">Compliance tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Priority Support</p>
                  <p className="text-sm text-muted-foreground">Email & chat</p>
                </div>
              </div>
            </>
          )}
          {mockSubscription.plan === 'ENTERPRISE' && (
            <>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Unlimited Users</p>
                  <p className="text-sm text-muted-foreground">Full team access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Enterprise CRM</p>
                  <p className="text-sm text-muted-foreground">Advanced automation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Enterprise Finance</p>
                  <p className="text-sm text-muted-foreground">Advanced analytics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-sm text-muted-foreground">Dedicated team</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">Custom Integration</p>
                  <p className="text-sm text-muted-foreground">API access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg">✓</span>
                <div>
                  <p className="font-medium">SLA Guarantee</p>
                  <p className="text-sm text-muted-foreground">99.9% uptime</p>
                </div>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* Subscription History */}
      <SectionCard title="Subscription History">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Old Plan</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">New Plan</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Changed At</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Changed By</th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptionHistory.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-lg bg-muted text-sm font-medium">
                      {entry.oldPlan}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-sm font-medium">
                      {entry.newPlan}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {new Date(entry.changedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {entry.changedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
